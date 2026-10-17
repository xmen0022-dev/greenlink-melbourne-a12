import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const projectId = 'fit5032-19cab'
const testEnvironment = await initializeTestEnvironment({
  projectId,
  firestore: {
    host: '127.0.0.1',
    port: 8080,
    rules: readFileSync('firestore.rules', 'utf8'),
  },
})

try {
  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'greenlink_spaces', 'rule-test-public'), { id: 9999, name: 'Test park' })
    await setDoc(doc(context.firestore(), 'users', 'organiser-1'), { role: 'organiser', name: 'Test organiser' })
  })

  const publicDb = testEnvironment.unauthenticatedContext().firestore()
  const residentDb = testEnvironment.authenticatedContext('resident-1').firestore()
  const otherResidentDb = testEnvironment.authenticatedContext('resident-2').firestore()
  const organiserDb = testEnvironment.authenticatedContext('organiser-1').firestore()

  assert.equal((await getDoc(doc(publicDb, 'greenlink_spaces', 'rule-test-public'))).data().name, 'Test park')
  await assert.rejects(setDoc(doc(publicDb, 'greenlink_spaces', 'rule-test-denied'), { id: 9998 }))

  await setDoc(doc(residentDb, 'greenlink_saved_items', 'saved-1'), {
    userId: 'resident-1',
    itemType: 'space',
    itemId: 1,
  })
  await assert.rejects(getDoc(doc(otherResidentDb, 'greenlink_saved_items', 'saved-1')))
  await assert.rejects(setDoc(doc(residentDb, 'greenlink_registrations', 'resident-1_201'), {
    userId: 'resident-1', eventId: 201, status: 'registered',
  }))

  await setDoc(doc(residentDb, 'users', 'resident-1'), { role: 'resident', name: 'Test resident' })
  await assert.rejects(setDoc(doc(residentDb, 'users', 'resident-1'), { role: 'organiser', name: 'Test resident' }))
  await setDoc(doc(organiserDb, 'greenlink_spaces', 'rule-test-organiser'), { id: 9997, name: 'Organiser park' })

  console.log('Firestore rules verified: catalogs are read-only, activity is owner-only, direct registrations are blocked, and organiser elevation is protected.')
} finally {
  await testEnvironment.cleanup()
}
