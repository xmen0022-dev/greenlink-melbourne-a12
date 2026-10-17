import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { setGlobalOptions } from 'firebase-functions/v2/options'

initializeApp()

setGlobalOptions({
  region: 'australia-southeast2',
  memory: '256MiB',
  timeoutSeconds: 30,
  maxInstances: 3,
})

const db = getFirestore()

function requireAuthentication(request) {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', 'You must be signed in to register for an event.')
  }
  return request.auth.uid
}

function parseEventId(value) {
  const eventId = Number(value)
  if (!Number.isSafeInteger(eventId) || eventId <= 0) {
    throw new HttpsError('invalid-argument', 'A valid event ID is required.')
  }
  return eventId
}

export const registerForEvent = onCall(async (request) => {
  const userId = requireAuthentication(request)
  const eventId = parseEventId(request.data?.eventId)
  const eventReference = db.collection('greenlink_events').doc(String(eventId))
  const registrationReference = db.collection('greenlink_registrations').doc(`${userId}_${eventId}`)

  return db.runTransaction(async (transaction) => {
    const [eventSnapshot, registrationSnapshot] = await Promise.all([
      transaction.get(eventReference),
      transaction.get(registrationReference),
    ])

    if (!eventSnapshot.exists) {
      throw new HttpsError('not-found', 'The selected event no longer exists.')
    }

    if (!registrationSnapshot.exists) {
      transaction.create(registrationReference, {
        userId,
        eventId,
        status: 'registered',
        createdAt: FieldValue.serverTimestamp(),
        source: 'cloud-function',
      })
    }

    const event = eventSnapshot.data()
    return {
      eventId,
      eventTitle: event.title,
      date: event.date,
      location: event.location,
      alreadyRegistered: registrationSnapshot.exists,
    }
  })
})

export const getCommunityImpactSummary = onCall(async () => {
  const collectionNames = {
    greenSpaces: 'greenlink_spaces',
    nativePlants: 'greenlink_plants',
    communityEvents: 'greenlink_events',
    registrations: 'greenlink_registrations',
  }
  const today = new Date().toISOString().slice(0, 10)

  const [entries, nextEventSnapshot] = await Promise.all([
    Promise.all(
      Object.entries(collectionNames).map(async ([key, collectionName]) => {
        const snapshot = await db.collection(collectionName).count().get()
        return [key, snapshot.data().count]
      }),
    ),
    db.collection('greenlink_events').where('dateIso', '>=', today).orderBy('dateIso').limit(1).get(),
  ])

  const nextEventDocument = nextEventSnapshot.docs[0]
  const nextEvent = nextEventDocument?.data()
  return {
    counts: Object.fromEntries(entries),
    nextEvent: nextEvent ? {
      id: nextEvent.id,
      title: nextEvent.title,
      date: nextEvent.date,
      location: nextEvent.location,
    } : null,
    generatedAt: new Date().toISOString(),
  }
})
