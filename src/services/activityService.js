import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase.js'
import { registerForEventOnServer } from './cloudFunctionsService.js'

const activityCollections = {
  saved: 'greenlink_saved_items',
  registrations: 'greenlink_registrations',
  ratings: 'greenlink_ratings',
  interests: 'greenlink_volunteer_interests',
}

// Deterministic IDs make save and rating writes idempotent for each user/item.
function activityDocumentId(userId, ...parts) {
  return [userId, ...parts].join('_')
}

async function readOwnedCollection(collectionName, userId) {
  const snapshot = await getDocs(query(collection(db, collectionName), where('userId', '==', userId)))
  return snapshot.docs.map((item) => ({ documentId: item.id, ...item.data() }))
}

export async function loadUserActivity(userId) {
  // Independent collections can be loaded in parallel to reduce startup time.
  const [savedItems, registrations, userRatings] = await Promise.all([
    readOwnedCollection(activityCollections.saved, userId),
    readOwnedCollection(activityCollections.registrations, userId),
    readOwnedCollection(activityCollections.ratings, userId),
  ])
  return { savedItems, registrations, userRatings }
}

export async function setSavedItem(userId, itemType, itemId, shouldSave) {
  const reference = doc(db, activityCollections.saved, activityDocumentId(userId, itemType, itemId))
  if (!shouldSave) return deleteDoc(reference)
  return setDoc(reference, { userId, itemType, itemId, createdAt: serverTimestamp() })
}

export function saveRegistration(_userId, eventId) {
  // Registration ownership is verified by the callable Cloud Function. The
  // unused parameter keeps this function aligned with other activity methods.
  return registerForEventOnServer(eventId)
}

export function saveRating(userId, itemType, itemId, value) {
  return setDoc(
    doc(db, activityCollections.ratings, activityDocumentId(userId, itemType, itemId)),
    { userId, itemType, itemId, value, updatedAt: serverTimestamp() },
    { merge: true },
  )
}

export function saveVolunteerInterest(userId, interest) {
  return addDoc(collection(db, activityCollections.interests), {
    ...interest,
    userId,
    createdAt: serverTimestamp(),
  })
}

export async function publishEvent(userId, event) {
  // The timestamp-based numeric ID matches the catalog's existing ID format.
  const id = Date.now()
  const publishedEvent = { ...event, id, ownerId: userId }
  await setDoc(doc(db, 'greenlink_events', String(id)), {
    ...publishedEvent,
    schemaVersion: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return publishedEvent
}
