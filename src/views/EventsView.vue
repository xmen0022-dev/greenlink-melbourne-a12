<script setup>
import { useGreenLink } from '../composables/useGreenLink.js'

const {
  averageRating, eventDate, eventDates, eventLocation, eventLocations, eventTypes,
  filteredEvents, isSaved, ratingCount, registerEvent, registeredEventIds,
  registrationMessages, selectedEventTypes, showDetail, toggleSaved,
} = useGreenLink()
</script>

<template>
  <section class="content-section events-section page-section">
    <div class="section-heading"><p class="eyebrow">Community Events</p><h2>Join local greening and biodiversity activities.</h2></div>
    <div class="filter-panel filter-columns">
      <div class="form-field"><label for="event-location">Location</label><select id="event-location" v-model="eventLocation"><option v-for="location in eventLocations" :key="location" :value="location">{{ location }}</option></select></div>
      <div class="form-field"><label for="event-date">Date</label><select id="event-date" v-model="eventDate"><option v-for="date in eventDates" :key="date" :value="date">{{ date }}</option></select></div>
      <fieldset><legend>Event Type</legend><label v-for="type in eventTypes" :key="type"><input v-model="selectedEventTypes" type="checkbox" :value="type" />{{ type }}</label></fieldset>
    </div>
    <div class="event-list">
      <article v-for="event in filteredEvents" :key="event.id" class="event-item">
        <div><span class="event-date">{{ event.date }}</span><h3>{{ event.title }}</h3><p>{{ event.location }}</p><p>{{ event.summary }}</p><p class="rating-summary">Average rating: {{ averageRating('event', event.id) }} / 5 ({{ ratingCount('event', event.id) }} reviews)</p></div>
        <div class="event-actions"><span class="event-tag">{{ event.tag }}</span><button type="button" @click="showDetail('event', event.id)">View Details</button><button type="button" @click="toggleSaved('event', event.id)">{{ isSaved('event', event.id) ? 'Saved' : 'Save' }}</button><button type="button" :disabled="registeredEventIds.includes(event.id)" @click="registerEvent(event.id)">{{ registeredEventIds.includes(event.id) ? 'Registered' : 'Register Interest' }}</button><p v-if="registrationMessages[event.id]" class="small-status" role="status">{{ registrationMessages[event.id] }}</p></div>
      </article>
    </div>
  </section>
</template>
