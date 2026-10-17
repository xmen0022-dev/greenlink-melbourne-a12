<script setup>
import { useGreenLink } from '../composables/useGreenLink.js'

const {
  eventErrors,
  eventSuccess,
  eventTypes,
  goToPage,
  newEventForm,
  organiserEvents,
  submitNewEvent,
} = useGreenLink()
</script>

<template>
  <section class="content-section page-section">
    <button class="text-button" type="button" @click="goToPage('account')">Back to My Account</button>
    <div class="section-heading">
      <p class="eyebrow">Organiser tools</p>
      <h2>Create a community event.</h2>
      <p>This page is protected and only available to organiser accounts.</p>
      <p v-if="organiserEvents.length">You have created {{ organiserEvents.length }} event(s) in this session.</p>
    </div>
    <form class="interest-form" novalidate @submit.prevent="submitNewEvent">
      <div class="form-field"><label for="new-event-title">Event title</label><input id="new-event-title" v-model="newEventForm.title" type="text" :aria-invalid="Boolean(eventErrors.title)" /><p v-if="eventErrors.title" class="field-error">{{ eventErrors.title }}</p></div>
      <div class="form-field"><label for="new-event-location">Location</label><input id="new-event-location" v-model="newEventForm.location" type="text" :aria-invalid="Boolean(eventErrors.location)" /><p v-if="eventErrors.location" class="field-error">{{ eventErrors.location }}</p></div>
      <div class="form-field"><label for="new-event-date">Date label</label><input id="new-event-date" v-model="newEventForm.date" type="text" placeholder="Sat 10 Oct" :aria-invalid="Boolean(eventErrors.date)" /><p v-if="eventErrors.date" class="field-error">{{ eventErrors.date }}</p></div>
      <div class="form-field"><label for="new-event-group">Date group</label><select id="new-event-group" v-model="newEventForm.dateGroup"><option value="This month">This month</option><option value="Next month">Next month</option></select></div>
      <div class="form-field"><label for="new-event-type">Event type</label><select id="new-event-type" v-model="newEventForm.tag"><option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option></select></div>
      <div class="form-field"><label for="new-event-summary">Summary</label><input id="new-event-summary" v-model="newEventForm.summary" type="text" :aria-invalid="Boolean(eventErrors.summary)" /><p v-if="eventErrors.summary" class="field-error">{{ eventErrors.summary }}</p></div>
      <button class="button primary form-submit" type="submit">Publish event</button>
      <p v-if="eventSuccess" class="form-success" role="status">Event added to the Community Events page.</p>
    </form>
  </section>
</template>
