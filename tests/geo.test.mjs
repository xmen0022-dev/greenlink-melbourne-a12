import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateDistanceKm, formatDistance, hasValidCoordinates } from '../src/utils/geo.js'

test('validates geographic coordinates', () => {
  assert.equal(hasValidCoordinates({ latitude: -37.8136, longitude: 144.9631 }), true)
  assert.equal(hasValidCoordinates({ latitude: -91, longitude: 144.9631 }), false)
  assert.equal(hasValidCoordinates(null), false)
})

test('calculates Melbourne distances with the haversine formula', () => {
  const melbourneCbd = { latitude: -37.8136, longitude: 144.9631 }
  const royalPark = { latitude: -37.7906, longitude: 144.9519 }
  const distance = calculateDistanceKm(melbourneCbd, royalPark)

  assert.ok(distance > 2.6 && distance < 2.9)
  assert.equal(formatDistance(distance), '2.7 km away')
})

test('formats short distances and rejects incomplete locations', () => {
  assert.equal(formatDistance(0.42), '420 m away')
  assert.equal(calculateDistanceKm({ latitude: 1 }, { latitude: 2, longitude: 3 }), null)
})
