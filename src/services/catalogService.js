import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from './firebase.js'

export const catalogCollections = {
  spaces: 'greenlink_spaces',
  plants: 'greenlink_plants',
  events: 'greenlink_events',
  learningTopics: 'greenlink_learning_topics',
}

async function readOrderedCollection(collectionName) {
  const snapshot = await getDocs(query(collection(db, collectionName), orderBy('id')))
  return snapshot.docs.map((document) => ({ ...document.data(), documentId: document.id }))
}

export async function fetchCatalogs() {
  const [spaces, plants, events, learningTopics] = await Promise.all([
    readOrderedCollection(catalogCollections.spaces),
    readOrderedCollection(catalogCollections.plants),
    readOrderedCollection(catalogCollections.events),
    readOrderedCollection(catalogCollections.learningTopics),
  ])

  return { spaces, plants, events, learningTopics }
}
