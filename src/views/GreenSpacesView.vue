<script setup>
import { computed, ref } from 'vue'
import InteractiveTable from '../components/common/InteractiveTable.vue'
import RatingPanel from '../components/common/RatingPanel.vue'
import GreenSpacesMap from '../components/maps/GreenSpacesMap.vue'
import { useGreenLink } from '../composables/useGreenLink.js'
import { calculateDistanceKm, formatDistance } from '../utils/geo.js'

const {
  activeSpaceType, averageRating, filteredSpaces, isSaved, ratingCount, searchInput, showDetail,
  spaceTypes, spaceView, toggleSaved,
} = useGreenLink()

const userLocation = ref(null)
const locating = ref(false)
const locationStatus = ref('Use your location to find the nearest green spaces.')

const spacesWithDistance = computed(() => {
  const spaces = filteredSpaces.value.map((space) => {
    const distanceKm = userLocation.value ? calculateDistanceKm(userLocation.value, space) : null
    return {
      ...space,
      distanceKm,
      distanceLabel: formatDistance(distanceKm),
    }
  })

  if (!userLocation.value) return spaces
  return spaces.sort((left, right) => (left.distanceKm ?? Infinity) - (right.distanceKm ?? Infinity))
})

const spaceColumns = computed(() => [
  { key: 'name', label: 'Name' },
  { key: 'suburb', label: 'Suburb' },
  { key: 'type', label: 'Type' },
  { key: 'summary', label: 'Description' },
  ...(userLocation.value ? [{
    key: 'distanceKm',
    label: 'Distance',
    format: (distance) => formatDistance(distance),
    searchable: false,
  }] : []),
  { key: 'rating', label: 'Rating', value: (space) => averageRating('space', space.id) },
  { key: 'actions', label: 'Actions', sortable: false, searchable: false },
])

function locationErrorMessage(error) {
  if (error?.code === 1) return 'Location permission was denied. Allow location access in your browser to sort nearby spaces.'
  if (error?.code === 2) return 'Your location is currently unavailable. Check your device location settings and try again.'
  if (error?.code === 3) return 'Finding your location timed out. Please try again.'
  return 'We could not find your location. You can continue using search and filters.'
}

function locateUser() {
  if (!navigator.geolocation) {
    locationStatus.value = 'This browser does not support location services.'
    return
  }

  locating.value = true
  locationStatus.value = 'Finding your current location...'
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      userLocation.value = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
      }
      locationStatus.value = 'Location found. Results are sorted from nearest to farthest.'
      locating.value = false
    },
    (error) => {
      locationStatus.value = locationErrorMessage(error)
      locating.value = false
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
  )
}

function clearLocation() {
  userLocation.value = null
  locationStatus.value = 'Location cleared. Results use the default order.'
}
</script>

<template>
  <section class="content-section page-section">
    <div class="section-heading"><p class="eyebrow">Explore Green Spaces</p><h2>Find parks, gardens, and nature reserves.</h2></div>
    <div class="filter-panel">
      <div class="form-field">
        <label for="space-search">Search by suburb or name</label>
        <div class="search-row"><input id="space-search" v-model="searchInput" type="search" placeholder="Enter suburb" /><button class="button primary" type="button">Search</button></div>
      </div>
      <div class="location-tools">
        <button class="button secondary" type="button" :disabled="locating" @click="locateUser">{{ locating ? 'Locating...' : (userLocation ? 'Update my location' : 'Use my location') }}</button>
        <button v-if="userLocation" class="text-button" type="button" @click="clearLocation">Clear location</button>
        <p role="status">{{ locationStatus }}</p>
      </div>
      <div class="control-row"><span>Filter:</span><button v-for="type in spaceTypes" :key="type" type="button" :class="{ active: activeSpaceType === type }" @click="activeSpaceType = type">{{ type }}</button></div>
      <div class="control-row"><span>View:</span><button type="button" :class="{ active: spaceView === 'map' }" @click="spaceView = 'map'">Map View</button><button type="button" :class="{ active: spaceView === 'list' }" @click="spaceView = 'list'">List View</button><button type="button" :class="{ active: spaceView === 'table' }" @click="spaceView = 'table'">Table View</button></div>
    </div>
    <GreenSpacesMap v-if="spaceView === 'map'" :spaces="spacesWithDistance" :user-location="userLocation" @select="(space) => showDetail('space', space.id)" />
    <InteractiveTable v-if="spaceView === 'table'" :rows="spacesWithDistance" :columns="spaceColumns" caption="Melbourne green spaces" :page-size="10">
      <template #cell-rating="{ row, value }">{{ value }} / 5 ({{ ratingCount('space', row.id) }})</template>
      <template #cell-actions="{ row }"><div class="table-actions"><button type="button" @click="showDetail('space', row.id)">View</button><button type="button" @click="toggleSaved('space', row.id)">{{ isSaved('space', row.id) ? 'Saved' : 'Save' }}</button></div></template>
    </InteractiveTable>
    <div v-else class="action-grid" :class="{ 'list-layout': spaceView === 'list' }">
      <article v-for="space in spacesWithDistance" :key="space.id" class="action-card">
        <h3>{{ space.name }}</h3><p>{{ space.suburb }} - {{ space.type }}</p><p>{{ space.summary }}</p>
        <p v-if="userLocation" class="distance-label">{{ space.distanceLabel }}</p>
        <RatingPanel type="space" :item-id="space.id" compact />
        <div class="card-actions"><button type="button" @click="showDetail('space', space.id)">View Details</button><button type="button" @click="toggleSaved('space', space.id)">{{ isSaved('space', space.id) ? 'Saved' : 'Save' }}</button></div>
      </article>
    </div>
  </section>
</template>
