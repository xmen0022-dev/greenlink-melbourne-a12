<script setup>
import { useGreenLink } from '../composables/useGreenLink.js'

const { goToPage } = useGreenLink()
</script>

<template>
  <section class="content-section page-section">
    <div class="empty-state">
      <p class="eyebrow">404</p>
      <h2>Page not found.</h2>
      <p>The page you requested does not exist or may have moved.</p>
      <button class="button primary" type="button" @click="goToPage('home')">Return home</button>
    </div>
  </section>
</template>
