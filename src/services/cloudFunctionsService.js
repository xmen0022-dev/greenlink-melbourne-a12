import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase.js'

export async function registerForEventOnServer(eventId) {
  const result = await httpsCallable(functions, 'registerForEvent')({ eventId })
  return result.data
}

export async function getCommunityImpactSummary() {
  const result = await httpsCallable(functions, 'getCommunityImpactSummary')()
  return result.data
}
