<script setup>
import { useGreenLink } from '../composables/useGreenLink.js'

// Learning cards reuse the shared catalog and detail route.
const { learningTopics, showDetail } = useGreenLink()
</script>

<template>
  <section class="content-section page-section">
    <div class="section-heading"><p class="eyebrow">Learn</p><h2>Learn about urban greening and biodiversity.</h2></div>
    <div class="action-grid">
      <article v-for="topic in learningTopics" :key="topic.id" class="action-card"><h3>{{ topic.title }}</h3><p>{{ topic.summary }}</p><button type="button" @click="showDetail('learn', topic.id)">Read More</button></article>
    </div>
  </section>
</template>
