import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, terminate, where } from 'firebase/firestore'

// This smoke test verifies the deployed Auth and Firestore configuration using
// temporary data that is removed before the script exits.
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
  appId: environment.VITE_FIREBASE_APP_ID,
})
const auth = getAuth(app)
const db = getFirestore(app)
const email = `greenlink-auth-check-${Date.now()}@example.com`
const password = 'GreenLink1!'

try {
  // Cover the complete register, sign-out, and sign-in lifecycle.
  const registered = await createUserWithEmailAndPassword(auth, email, password)
  const registeredUid = registered.user.uid
  await signOut(auth)

  const loggedIn = await signInWithEmailAndPassword(auth, email, password)
  assert.equal(loggedIn.user.uid, registeredUid)

  const activityReference = doc(db, 'greenlink_saved_items', `${registeredUid}_cloud-check`)
  await setDoc(activityReference, {
    userId: registeredUid,
    itemType: 'space',
    itemId: 'cloud-check',
  })
  const ownedActivity = await getDocs(
    query(collection(db, 'greenlink_saved_items'), where('userId', '==', registeredUid)),
  )
  assert.equal(ownedActivity.docs.some((item) => item.id === activityReference.id), true)
  await deleteDoc(activityReference)
  await deleteUser(loggedIn.user)

  console.log('Cloud Firebase Auth and Firestore activity persistence verified; temporary data was removed.')
} finally {
  // Best-effort cleanup also handles failures partway through the test.
  if (auth.currentUser) await deleteUser(auth.currentUser).catch(() => {})
  await terminate(db)
}
