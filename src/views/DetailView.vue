<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import RatingPanel from '../components/common/RatingPanel.vue'
import { useGreenLink } from '../composables/useGreenLink.js'

const route = useRoute()
const { closeDetail, detailData, detailItem, isSaved, registerEvent, registeredEventIds, setDetailFromRoute, toggleSaved } = useGreenLink()

watch(
  () => [route.params.type, route.params.id],
  ([type, id]) => setDetailFromRoute(type, id),
  { immediate: true },
)

onBeforeUnmount(() => {
  detailItem.value = null
})
</script>

<template>
  <section v-if="detailData" class="content-section page-section">
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
  <section v-else class="content-section page-section">
    <div class="empty-state"><h2>Item not found.</h2><p>The requested GreenLink item does not exist.</p><button class="button primary" type="button" @click="closeDetail">Go back</button></div>
  </section>
</template>
