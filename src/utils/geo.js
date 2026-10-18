const earthRadiusKm = 6371.0088

function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

function validCoordinate(value, minimum, maximum) {
  const coordinate = Number(value)
  return Number.isFinite(coordinate) && coordinate >= minimum && coordinate <= maximum
}

export function hasValidCoordinates(location) {
  return Boolean(location)
    && validCoordinate(location.latitude, -90, 90)
    && validCoordinate(location.longitude, -180, 180)
}

export function calculateDistanceKm(origin, destination) {
  if (!hasValidCoordinates(origin) || !hasValidCoordinates(destination)) return null

  const originLatitude = toRadians(Number(origin.latitude))
  const destinationLatitude = toRadians(Number(destination.latitude))
  const latitudeDelta = destinationLatitude - originLatitude
  const longitudeDelta = toRadians(Number(destination.longitude) - Number(origin.longitude))

  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(originLatitude) * Math.cos(destinationLatitude) * Math.sin(longitudeDelta / 2) ** 2

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
}

export function formatDistance(distanceKm) {
  if (!Number.isFinite(distanceKm)) return 'Location required'
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m away`
  return `${distanceKm.toFixed(1)} km away`
}
