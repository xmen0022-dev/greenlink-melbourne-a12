import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase.js'

function normaliseProfile(firebaseUser, profile = {}) {
  return {
    id: firebaseUser.uid,
    name: profile.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'GreenLink resident',
    email: firebaseUser.email || profile.email || '',
    role: profile.role === 'organiser' ? 'organiser' : 'resident',
  }
}

async function loadOrCreateProfile(firebaseUser) {
  const profileReference = doc(db, 'users', firebaseUser.uid)
  const snapshot = await getDoc(profileReference)

  if (snapshot.exists()) return normaliseProfile(firebaseUser, snapshot.data())

  const profile = normaliseProfile(firebaseUser)
  await setDoc(profileReference, {
    name: profile.name,
    email: profile.email,
    role: 'resident',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return profile
}

export function observeAuthentication(onChange) {
  return onAuthStateChanged(
    auth,
    async (firebaseUser) => {
      try {
        onChange(firebaseUser ? await loadOrCreateProfile(firebaseUser) : null)
      } catch (error) {
        onChange(null, error)
      }
    },
    (error) => onChange(null, error),
  )
}

export async function loginWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return loadOrCreateProfile(credential.user)
}

export async function registerResident({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)

  try {
    await updateProfile(credential.user, { displayName: name })
    const profile = normaliseProfile(credential.user, { name, role: 'resident' })
    await setDoc(doc(db, 'users', credential.user.uid), {
      name: profile.name,
      email: profile.email,
      role: profile.role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return profile
  } catch (error) {
    await deleteUser(credential.user).catch(() => {})
    throw error
  }
}

export function logoutFromFirebase() {
  return signOut(auth)
}
