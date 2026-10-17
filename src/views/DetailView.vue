<script setup>
import RatingPanel from '../components/common/RatingPanel.vue'
import { useGreenLink } from '../composables/useGreenLink.js'

const { closeDetail, detailData, detailItem, isSaved, registerEvent, registeredEventIds, toggleSaved } = useGreenLink()
</script>

<template>
  <section class="content-section page-section">
    <div class="detail-card">
      <button class="text-button" type="button" @click="closeDetail">Back</button>
      <p class="eyebrow">Details</p><h2>{{ detailData.name || detailData.title }}</h2>
      <p>{{ detailData.detail || detailData.summary }}</p>
      <p v-if="detailData.suburb">Location: {{ detailData.suburb }}</p>
      <p v-if="detailData.location">Location: {{ detailData.location }}</p>
      <p v-if="detailData.date">Date: {{ detailData.date }}</p>
      <p v-if="detailData.tag">Type: {{ detailData.tag }}</p>
      <RatingPanel v-if="detailItem.type !== 'learn'" :type="detailItem.type" :item-id="detailItem.id" />
      <div class="hero-actions">
        <button v-if="detailItem.type !== 'learn'" class="button secondary" type="button" @click="toggleSaved(detailItem.type, detailItem.id)">{{ isSaved(detailItem.type, detailItem.id) ? 'Saved' : 'Save' }}</button>
        <button v-if="detailItem.type === 'event'" class="button primary" type="button" :disabled="registeredEventIds.includes(detailItem.id)" @click="registerEvent(detailItem.id)">{{ registeredEventIds.includes(detailItem.id) ? 'Registered' : 'Register Interest' }}</button>
      </div>
    </div>
  </section>
</template>
