<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { hasValidCoordinates } from '../../utils/geo.js'

const props = defineProps({
  spaces: {
    type: Array,
    default: () => [],
  },
  userLocation: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['select'])
const mapElement = ref(null)

const melbourneCentre = [-37.8136, 144.9631]
let map
let markerLayer
let userLayer

function hasCoordinates(space) {
  return hasValidCoordinates(space)
}

function createTextElement(tagName, text, className = '') {
  // Build popup content with textContent so catalog text is never interpreted
  // as executable HTML.
  const element = document.createElement(tagName)
  element.textContent = text
  if (className) element.className = className
  return element
}

function createPopup(space) {
  const popup = document.createElement('div')
  popup.className = 'greenlink-map-popup'
  popup.append(
    createTextElement('strong', space.name),
    createTextElement('span', `${space.suburb} - ${space.type}`),
    createTextElement('p', space.summary),
  )

  if (Number.isFinite(space.distanceKm)) {
    popup.append(createTextElement('span', space.distanceLabel, 'greenlink-popup-distance'))
  }

  const button = createTextElement('button', 'View details')
  button.type = 'button'
  button.addEventListener('click', () => emit('select', space))
  popup.append(button)
  return popup
}

function renderMapContent() {
  if (!map || !markerLayer || !userLayer) return

  // Rebuild only application-owned layers when filters or location change; the
  // base OpenStreetMap tile layer remains untouched.
  markerLayer.clearLayers()
  userLayer.clearLayers()
  const plottedSpaces = props.spaces.filter(hasCoordinates)
  const bounds = []

  plottedSpaces.forEach((space) => {
    const coordinates = [Number(space.latitude), Number(space.longitude)]
    const marker = L.marker(coordinates, {
      icon: L.divIcon({
        className: 'greenlink-marker-container',
        html: '<span class="greenlink-map-marker" aria-hidden="true"></span>',
        iconSize: [30, 38],
        iconAnchor: [15, 38],
        popupAnchor: [0, -34],
      }),
      keyboard: true,
      title: space.name,
      alt: `${space.name}, ${space.suburb}`,
    })

    marker.bindPopup(createPopup(space), { minWidth: 220, maxWidth: 300 })
    marker.addTo(markerLayer)
    bounds.push(coordinates)
  })

  if (hasCoordinates(props.userLocation)) {
    const userCoordinates = [Number(props.userLocation.latitude), Number(props.userLocation.longitude)]
    const accuracy = Math.max(1, Number(props.userLocation.accuracy) || 1)

    // The outer circle communicates browser-reported location accuracy.
    L.circle(userCoordinates, {
      radius: accuracy,
      color: '#1769aa',
      fillColor: '#4da3df',
      fillOpacity: 0.12,
      weight: 2,
    }).addTo(userLayer)

    L.circleMarker(userCoordinates, {
      radius: 8,
      color: '#ffffff',
      fillColor: '#1769aa',
      fillOpacity: 1,
      weight: 3,
    }).bindTooltip('Your current location', { direction: 'top' }).addTo(userLayer)

    bounds.push(userCoordinates)
  }

  // Choose a useful viewport for zero, one, or many visible points.
  if (bounds.length === 0) {
    map.setView(melbourneCentre, 12)
  } else if (bounds.length === 1) {
    map.setView(bounds[0], 14)
  } else {
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 })
  }
}

onMounted(async () => {
  map = L.map(mapElement.value, {
    zoomControl: true,
    scrollWheelZoom: false,
  }).setView(melbourneCentre, 12)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 19,
  }).addTo(map)

  markerLayer = L.layerGroup().addTo(map)
  userLayer = L.layerGroup().addTo(map)
  renderMapContent()
  await nextTick()
  map.invalidateSize()
})

watch([() => props.spaces, () => props.userLocation], renderMapContent, { deep: true })

onBeforeUnmount(() => {
  // Leaflet installs DOM listeners, so dispose the map with the Vue component.
  map?.remove()
  map = null
  markerLayer = null
  userLayer = null
})
</script>

<template>
  <div class="green-spaces-map-shell">
    <div
      ref="mapElement"
      class="green-spaces-map"
      role="application"
      aria-label="Interactive map of Melbourne green spaces"
    ></div>
    <p class="map-result-summary" aria-live="polite">
      Showing {{ spaces.length }} green {{ spaces.length === 1 ? 'space' : 'spaces' }} on the map.
    </p>
  </div>
</template>
