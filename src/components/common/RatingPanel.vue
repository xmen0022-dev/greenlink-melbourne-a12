<script setup>
import { useGreenLink } from '../../composables/useGreenLink.js'

const props = defineProps({
  type: { type: String, required: true },
  itemId: { type: [Number, String], required: true },
  compact: { type: Boolean, default: false },
})

const {
  averageRating,
  ratingCount,
  ratingInputs,
  ratingKey,
  ratingMessages,
  setRatingInput,
  submitRating,
} = useGreenLink()
</script>

<template>
  <div :class="{ 'rating-panel': !compact }">
    <p v-if="compact" class="rating-summary">
      Average rating: {{ averageRating(type, itemId) }} / 5 ({{ ratingCount(type, itemId) }} reviews)
    </p>
    <template v-else>
      <strong>Average rating: {{ averageRating(type, itemId) }} / 5</strong>
      <span>{{ ratingCount(type, itemId) }} reviews</span>
    </template>
    <div class="rating-row">
      <select
        :value="ratingInputs[ratingKey(type, itemId)] || ''"
        :aria-label="`Rate this ${type}`"
        @change="setRatingInput(type, itemId, $event.target.value)"
      >
        <option value="">{{ compact ? 'Rate' : 'Rate this' }}</option>
        <option v-for="score in 5" :key="score" :value="score">{{ score }}</option>
      </select>
      <button type="button" @click="submitRating(type, itemId)">{{ compact ? 'Submit' : 'Submit rating' }}</button>
    </div>
    <p v-if="!compact && ratingMessages[ratingKey(type, itemId)]" class="small-status">
      {{ ratingMessages[ratingKey(type, itemId)] }}
    </p>
  </div>
</template>
