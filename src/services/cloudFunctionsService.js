import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase.js'

// Keep Firebase callable details in this service so views only handle plain
// application data and errors.
export async function registerForEventOnServer(eventId) {
  const result = await httpsCallable(functions, 'registerForEvent')({ eventId })
  return result.data
}

export async function getCommunityImpactSummary() {
  const result = await httpsCallable(functions, 'getCommunityImpactSummary')()
  return result.data
}
