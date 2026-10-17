<script setup>
import { useGreenLink } from '../composables/useGreenLink.js'

const { goToPage, impactStats, quickActions } = useGreenLink()
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
      <div class="hero-note"><strong>Next event</strong><span>Tree planting registrations are open this week.</span></div>
    </div>
  </section>

  <section class="stats-strip" aria-label="GreenLink impact">
    <div v-for="stat in impactStats" :key="stat.label"><strong>{{ stat.value }}</strong><span>{{ stat.label }}</span></div>
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
