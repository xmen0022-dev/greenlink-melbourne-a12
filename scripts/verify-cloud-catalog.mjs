import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { initializeApp } from 'firebase/app'
import { collection, getCountFromServer, getFirestore, terminate } from 'firebase/firestore'

const environment = Object.fromEntries(
  readFileSync(resolve('.env.local'), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const separator = line.indexOf('=')
      return [line.slice(0, separator), line.slice(separator + 1)]
    }),
)

const app = initializeApp({
  apiKey: environment.VITE_FIREBASE_API_KEY,
  authDomain: environment.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: environment.VITE_FIREBASE_PROJECT_ID,
  storageBucket: environment.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.VITE_FIREBASE_APP_ID,
})
const db = getFirestore(app)
const expectedCounts = {
  greenlink_spaces: 12,
  greenlink_plants: 12,
  greenlink_events: 12,
  greenlink_learning_topics: 6,
}

try {
  const results = await Promise.all(
    Object.entries(expectedCounts).map(async ([collectionName, expected]) => {
      const snapshot = await getCountFromServer(collection(db, collectionName))
      const actual = snapshot.data().count
      if (actual !== expected) throw new Error(`${collectionName}: expected ${expected}, received ${actual}`)
      return `${collectionName}=${actual}`
    }),
  )

  const legacyBooks = await getCountFromServer(collection(db, 'books'))
  console.log(`Cloud catalog verified (${results.join(', ')}); legacy books remains readable (${legacyBooks.data().count} record).`)
} finally {
  await terminate(db)
}
