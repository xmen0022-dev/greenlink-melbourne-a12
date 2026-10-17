import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { deleteApp, initializeApp } from 'firebase/app'
import { connectAuthEmulator, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, doc, getDoc, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'

function readEnvironmentFile(filePath) {
  return Object.fromEntries(readFileSync(filePath, 'utf8').split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => { const separator = line.indexOf('='); return [line.slice(0, separator), line.slice(separator + 1)] }))
}

const environment = readEnvironmentFile(resolve('.env.local'))
const projectId = environment.VITE_FIREBASE_PROJECT_ID
const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}`
const app = initializeApp({ projectId, apiKey: 'demo-key', appId: 'demo-app' }, `functions-test-${unique}`)
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app, 'australia-southeast2')

connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
connectFirestoreEmulator(db, '127.0.0.1', 8080)
connectFunctionsEmulator(functions, '127.0.0.1', 5001)

try {
  const summaryResult = await httpsCallable(functions, 'getCommunityImpactSummary')()
  assert.equal(summaryResult.data.counts.greenSpaces, 12)
  assert.equal(summaryResult.data.counts.nativePlants, 12)
  assert.equal(summaryResult.data.counts.communityEvents, 12)
  assert.equal(summaryResult.data.nextEvent.title, 'Royal Park Tree Planting Day')

  const credential = await createUserWithEmailAndPassword(auth, `functions-${unique}@example.com`, 'TestPass123!')
  const registrationResult = await httpsCallable(functions, 'registerForEvent')({ eventId: 201 })
  assert.equal(registrationResult.data.eventId, 201)
  assert.equal(registrationResult.data.alreadyRegistered, false)

  const savedRegistration = await getDoc(doc(db, 'greenlink_registrations', `${credential.user.uid}_201`))
  assert.equal(savedRegistration.exists(), true)
  assert.equal(savedRegistration.data().source, 'cloud-function')

  const duplicateResult = await httpsCallable(functions, 'registerForEvent')({ eventId: 201 })
  assert.equal(duplicateResult.data.alreadyRegistered, true)
  console.log('Cloud Functions emulator integration checks passed.')
} finally {
  await deleteApp(app)
}
