<script setup>
import { useGreenLink } from '../composables/useGreenLink.js'

const {
  eventErrors, eventSuccess, eventTypes, interestErrors, interestForm,
  interestSuccess, isOrganiser, newEventForm, organiserEvents, registeredEvents,
  savedEvents, savedPlants, savedSpaces, showDetail, submitInterest,
  submitNewEvent, userRoleLabel, validateInterestArea, validateInterestEmail,
  validateInterestName, validateSuburb,
} = useGreenLink()
</script>

<template>
  <section class="content-section page-section">
    <div class="section-heading"><p class="eyebrow">My Account</p><h2>Your saved items and registrations.</h2></div>
    <div class="account-summary">
      <article class="role-card">
        <span>Current role</span><strong>{{ userRoleLabel }}</strong>
        <p v-if="isOrganiser">You can create community events and manage your submitted event list.</p>
        <p v-else>You can save items, register for events, and submit interest in local action.</p>
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

  <section v-if="isOrganiser" class="form-section">
    <div class="form-copy"><p class="eyebrow">Organiser tools</p><h2>Create a community event.</h2><p>This role-based section is only available to organiser accounts.</p><p v-if="organiserEvents.length">You have created {{ organiserEvents.length }} event(s) in this session.</p></div>
    <form class="interest-form" novalidate @submit.prevent="submitNewEvent">
      <div class="form-field"><label for="new-event-title">Event title</label><input id="new-event-title" v-model="newEventForm.title" type="text" :aria-invalid="Boolean(eventErrors.title)" /><p v-if="eventErrors.title" class="field-error">{{ eventErrors.title }}</p></div>
      <div class="form-field"><label for="new-event-location">Location</label><input id="new-event-location" v-model="newEventForm.location" type="text" :aria-invalid="Boolean(eventErrors.location)" /><p v-if="eventErrors.location" class="field-error">{{ eventErrors.location }}</p></div>
      <div class="form-field"><label for="new-event-date">Date label</label><input id="new-event-date" v-model="newEventForm.date" type="text" placeholder="Sat 10 Oct" :aria-invalid="Boolean(eventErrors.date)" /><p v-if="eventErrors.date" class="field-error">{{ eventErrors.date }}</p></div>
      <div class="form-field"><label for="new-event-group">Date group</label><select id="new-event-group" v-model="newEventForm.dateGroup"><option value="This month">This month</option><option value="Next month">Next month</option></select></div>
      <div class="form-field"><label for="new-event-type">Event type</label><select id="new-event-type" v-model="newEventForm.tag"><option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option></select></div>
      <div class="form-field"><label for="new-event-summary">Summary</label><input id="new-event-summary" v-model="newEventForm.summary" type="text" :aria-invalid="Boolean(eventErrors.summary)" /><p v-if="eventErrors.summary" class="field-error">{{ eventErrors.summary }}</p></div>
      <button class="button primary form-submit" type="submit">Publish event</button><p v-if="eventSuccess" class="form-success" role="status">Event added to the Community Events page.</p>
    </form>
  </section>

  <section class="form-section">
    <div class="form-copy"><p class="eyebrow">Register interest</p><h2>Tell us what kind of local action suits you.</h2><p>This demo form validates user input before saving a volunteer interest request.</p></div>
    <form class="interest-form" novalidate @submit.prevent="submitInterest">
      <div class="form-field"><label for="name">Full name</label><input id="name" v-model="interestForm.name" type="text" autocomplete="name" :aria-invalid="Boolean(interestErrors.name)" @blur="validateInterestName(true)" @input="validateInterestName(false)" /><p v-if="interestErrors.name" class="field-error">{{ interestErrors.name }}</p></div>
      <div class="form-field"><label for="email">Email address</label><input id="email" v-model="interestForm.email" type="email" autocomplete="email" :aria-invalid="Boolean(interestErrors.email)" @blur="validateInterestEmail(true)" @input="validateInterestEmail(false)" /><p v-if="interestErrors.email" class="field-error">{{ interestErrors.email }}</p></div>
      <div class="form-field"><label for="suburb">Suburb</label><input id="suburb" v-model="interestForm.suburb" type="text" autocomplete="address-level2" :aria-invalid="Boolean(interestErrors.suburb)" @blur="validateSuburb(true)" @input="validateSuburb(false)" /><p v-if="interestErrors.suburb" class="field-error">{{ interestErrors.suburb }}</p></div>
      <div class="form-field"><label for="interest">Interest area</label><select id="interest" v-model="interestForm.interest" :aria-invalid="Boolean(interestErrors.interest)" @blur="validateInterestArea(true)" @change="validateInterestArea(false)"><option value="">Select one</option><option value="tree-planting">Tree planting</option><option value="native-plants">Native planting</option><option value="biodiversity">Biodiversity monitoring</option><option value="community-garden">Community gardening</option></select><p v-if="interestErrors.interest" class="field-error">{{ interestErrors.interest }}</p></div>
      <button class="button primary form-submit" type="submit">Submit interest</button><p v-if="interestSuccess" class="form-success" role="status">Thanks. Your volunteer interest has been recorded for this demo.</p>
    </form>
  </section>
</template>
