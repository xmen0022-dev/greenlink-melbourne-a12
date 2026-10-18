<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGreenLink } from '../composables/useGreenLink.js'

// The account page combines role information, saved activity, registrations,
// and the volunteer-interest form for the signed-in user.
const route = useRoute()
const accessNotice = computed(() => route.query.access === 'organiser' ? 'Organiser access is required for that page.' : '')

const {
  activityError, activityLoading, goToPage, interestEmailStatus, interestErrors, interestForm,
  interestSuccess, isOrganiser,
  registeredEvents, savedEvents, savedPlants, savedSpaces, showDetail, submitInterest,
  userRoleLabel, validateInterestArea, validateInterestEmail,
  validateInterestName, validateSuburb,
} = useGreenLink()
</script>

<template>
  <section class="content-section page-section">
    <div class="section-heading"><p class="eyebrow">My Account</p><h2>Your saved items and registrations.</h2></div>
    <p v-if="accessNotice" class="auth-notice">{{ accessNotice }}</p>
    <p v-if="activityLoading" class="auth-notice" role="status">Loading your saved activity…</p>
    <p v-if="activityError" class="field-error" role="alert">{{ activityError }}</p>
    <div class="account-summary">
      <article class="role-card">
        <span>Current role</span><strong>{{ userRoleLabel }}</strong>
        <p v-if="isOrganiser">You can create community events and manage your submitted event list.</p>
        <p v-else>You can save items, register for events, and submit interest in local action.</p>
        <button v-if="isOrganiser" class="button secondary" type="button" @click="goToPage('organiser-events')">Open organiser tools</button>
      </article>
      <article class="security-note"><strong>Security practices</strong><p>Forms validate input before submission. Stored text is trimmed and angle brackets are removed to reduce XSS risk.</p></article>
    </div>
    <div class="account-grid">
      <article class="action-card"><h3>Saved Green Spaces</h3><p v-if="savedSpaces.length === 0">No saved green spaces yet.</p><button v-for="space in savedSpaces" :key="space.id" type="button" @click="showDetail('space', space.id)">{{ space.name }}</button></article>
      <article class="action-card"><h3>Saved Plants</h3><p v-if="savedPlants.length === 0">No saved plants yet.</p><button v-for="plant in savedPlants" :key="plant.id" type="button" @click="showDetail('plant', plant.id)">{{ plant.name }}</button></article>
      <article class="action-card"><h3>Saved Events</h3><p v-if="savedEvents.length === 0">No saved events yet.</p><button v-for="event in savedEvents" :key="event.id" type="button" @click="showDetail('event', event.id)">{{ event.title }}</button></article>
      <article class="action-card"><h3>Registered Events</h3><p v-if="registeredEvents.length === 0">No event registrations yet.</p><button v-for="event in registeredEvents" :key="event.id" type="button" @click="showDetail('event', event.id)">{{ event.title }}</button></article>
    </div>
  </section>

  <section class="form-section">
    <div class="form-copy"><p class="eyebrow">Register interest</p><h2>Tell us what kind of local action suits you.</h2><p>Your validated volunteer interest will be securely saved to your account.</p></div>
    <form class="interest-form" novalidate @submit.prevent="submitInterest">
      <div class="form-field"><label for="name">Full name</label><input id="name" v-model="interestForm.name" type="text" autocomplete="name" :aria-invalid="Boolean(interestErrors.name)" @blur="validateInterestName(true)" @input="validateInterestName(false)" /><p v-if="interestErrors.name" class="field-error">{{ interestErrors.name }}</p></div>
      <div class="form-field"><label for="email">Email address</label><input id="email" v-model="interestForm.email" type="email" autocomplete="email" :aria-invalid="Boolean(interestErrors.email)" @blur="validateInterestEmail(true)" @input="validateInterestEmail(false)" /><p v-if="interestErrors.email" class="field-error">{{ interestErrors.email }}</p></div>
      <div class="form-field"><label for="suburb">Suburb</label><input id="suburb" v-model="interestForm.suburb" type="text" autocomplete="address-level2" :aria-invalid="Boolean(interestErrors.suburb)" @blur="validateSuburb(true)" @input="validateSuburb(false)" /><p v-if="interestErrors.suburb" class="field-error">{{ interestErrors.suburb }}</p></div>
      <div class="form-field"><label for="interest">Interest area</label><select id="interest" v-model="interestForm.interest" :aria-invalid="Boolean(interestErrors.interest)" @blur="validateInterestArea(true)" @change="validateInterestArea(false)"><option value="">Select one</option><option value="tree-planting">Tree planting</option><option value="native-plants">Native planting</option><option value="biodiversity">Biodiversity monitoring</option><option value="community-garden">Community gardening</option></select><p v-if="interestErrors.interest" class="field-error">{{ interestErrors.interest }}</p></div>
      <button class="button primary form-submit" type="submit">Submit interest</button><p v-if="interestSuccess" class="form-success" role="status">Thanks. Your volunteer interest has been saved.</p><p v-if="interestEmailStatus" class="small-status" role="status">{{ interestEmailStatus }}</p>
    </form>
  </section>
</template>
