<script setup>
import { computed, onMounted, ref } from 'vue'
import { useGreenLink } from '../composables/useGreenLink.js'
import { getCommunityImpactSummary } from '../services/cloudFunctionsService.js'

const { goToPage, impactStats, quickActions } = useGreenLink()
const cloudImpact = ref(null)
const cloudStatus = ref('loading')

// Prefer the server-generated summary, while keeping bundled values available
// for offline development or a temporary Cloud Functions failure.
const displayedImpactStats = computed(() => cloudImpact.value ? [
  { value: cloudImpact.value.counts.greenSpaces, label: 'green spaces available' },
  { value: cloudImpact.value.counts.nativePlants, label: 'native plants catalogued' },
  { value: cloudImpact.value.counts.communityEvents, label: 'community events' },
] : impactStats)

onMounted(async () => {
  try {
    cloudImpact.value = await getCommunityImpactSummary()
    cloudStatus.value = 'live'
  } catch (error) {
    console.error('Cloud Functions impact summary failed:', error)
    cloudStatus.value = 'fallback'
  }
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-copy">
      <p class="eyebrow">Urban greening and biodiversity</p>
      <h1>Make Melbourne greener together.</h1>
      <p class="hero-text">Explore local green spaces, discover suitable native plants, and join community activities that support tree planting and biodiversity.</p>
      <div class="hero-actions" aria-label="Primary actions">
        <button class="button primary" type="button" @click="goToPage('spaces')">Explore Green Spaces</button>
        <button class="button secondary" type="button" @click="goToPage('plants')">Find Native Plants</button>
        <button class="button secondary" type="button" @click="goToPage('events')">View Events</button>
      </div>
    </div>
    <div class="hero-panel" aria-label="Current GreenLink snapshot">
      <div class="map-card">
        <div class="map-header"><span>Melbourne green network</span><strong>Live</strong></div>
        <div class="map-visual">
          <span class="pin pin-one"></span><span class="pin pin-two"></span><span class="pin pin-three"></span>
          <span class="route route-one"></span><span class="route route-two"></span>
        </div>
      </div>
      <div class="hero-note"><strong>Next event</strong><span>{{ cloudImpact?.nextEvent ? `${cloudImpact.nextEvent.title} — ${cloudImpact.nextEvent.date}` : 'Tree planting registrations are open this week.' }}</span></div>
    </div>
  </section>

  <section class="stats-strip" aria-label="GreenLink impact">
    <div v-for="stat in displayedImpactStats" :key="stat.label"><strong>{{ stat.value }}</strong><span>{{ stat.label }}</span></div>
    <p class="stats-source" role="status">{{ cloudStatus === 'live' ? 'Live Cloud Functions data' : cloudStatus === 'loading' ? 'Loading live data…' : 'Cached catalogue snapshot' }}</p>
  </section>

  <section class="content-section">
    <div class="section-heading"><p class="eyebrow">Start here</p><h2>What would you like to do?</h2></div>
    <div class="action-grid">
      <article v-for="action in quickActions" :key="action.title" class="action-card">
        <h3>{{ action.title }}</h3><p>{{ action.text }}</p>
        <button type="button" @click="goToPage(action.page)">{{ action.cta }}</button>
      </article>
    </div>
  </section>
</template>
