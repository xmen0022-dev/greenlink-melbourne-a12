import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { initializeApp } from 'firebase/app'
import {
  doc,
  getFirestore,
  serverTimestamp,
  terminate,
  writeBatch,
} from 'firebase/firestore'
import {
  greenSpaces,
  initialEvents,
  learningTopics,
  nativePlants,
} from '../src/data/catalog.js'

function readEnvironmentFile(filePath) {
  return Object.fromEntries(
    readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=')
        return [line.slice(0, separator), line.slice(separator + 1)]
      }),
  )
}

const environment = readEnvironmentFile(resolve('.env.local'))
const projectId = environment.VITE_FIREBASE_PROJECT_ID
const useCloud = process.argv.includes('--cloud')
const confirmation = process.argv.find((argument) => argument.startsWith('--confirm-project='))?.split('=')[1]

if (useCloud && confirmation !== projectId) {
  throw new Error(`Cloud seeding requires --confirm-project=${projectId}`)
}

const datasets = [
  ['greenlink_spaces', greenSpaces],
  ['greenlink_plants', nativePlants],
  ['greenlink_events', initialEvents],
  ['greenlink_learning_topics', learningTopics],
]

async function seedDatabase(db) {
  const batch = writeBatch(db)

  for (const [collectionName, records] of datasets) {
    for (const record of records) {
      batch.set(
        doc(db, collectionName, String(record.id)),
        { ...record, schemaVersion: 1, updatedAt: serverTimestamp() },
        { merge: true },
      )
    }
  }

  batch.set(
    doc(db, 'greenlink_meta', 'catalog'),
    {
      schemaVersion: 1,
      counts: Object.fromEntries(datasets.map(([name, records]) => [name, records.length])),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )

  await batch.commit()
}

if (useCloud) {
  const firebaseApp = initializeApp({
    apiKey: environment.VITE_FIREBASE_API_KEY,
    authDomain: environment.VITE_FIREBASE_AUTH_DOMAIN,
    projectId,
    storageBucket: environment.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: environment.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: environment.VITE_FIREBASE_APP_ID,
  })
  const db = getFirestore(firebaseApp)

  await seedDatabase(db)
  await terminate(db)
} else {
  const { initializeTestEnvironment } = await import('@firebase/rules-unit-testing')
  const testEnvironment = await initializeTestEnvironment({
    projectId,
    firestore: { host: '127.0.0.1', port: 8080 },
  })

  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    await seedDatabase(context.firestore())
  })
  await testEnvironment.cleanup()
}

console.log(`Seeded ${datasets.reduce((total, [, records]) => total + records.length, 0)} GreenLink records into ${useCloud ? projectId : 'the local emulator'}.`)
