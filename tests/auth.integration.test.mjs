import assert from 'node:assert/strict'
import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { connectFirestoreEmulator, deleteDoc, doc, getDoc, getFirestore, setDoc, terminate } from 'firebase/firestore'

const projectId = 'fit5032-19cab'
const email = `resident-${Date.now()}@greenlink.test`
const password = 'Resident1'
const app = initializeApp({ apiKey: 'demo-key', projectId })
const auth = getAuth(app)
const db = getFirestore(app)

connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
connectFirestoreEmulator(db, '127.0.0.1', 8080)

try {
  const registered = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(registered.user, { displayName: 'Integration Resident' })
  await setDoc(doc(db, 'users', registered.user.uid), {
    name: 'Integration Resident',
    email,
    role: 'resident',
  })

  assert.equal((await getDoc(doc(db, 'users', registered.user.uid))).data().role, 'resident')
  await signOut(auth)

  const loggedIn = await signInWithEmailAndPassword(auth, email, password)
  assert.equal(loggedIn.user.displayName, 'Integration Resident')

  for (const collectionName of [
    'greenlink_saved_items',
    'greenlink_registrations',
    'greenlink_ratings',
    'greenlink_volunteer_interests',
  ]) {
    const activityReference = doc(db, collectionName, `${loggedIn.user.uid}_integration`)
    await setDoc(activityReference, { userId: loggedIn.user.uid, test: true })
    assert.equal((await getDoc(activityReference)).data().userId, loggedIn.user.uid)
    await deleteDoc(activityReference)
  }

  await deleteUser(loggedIn.user)

  console.log('Firebase Auth and user activity persistence verified in the local emulators.')
} finally {
  await terminate(db)
}
