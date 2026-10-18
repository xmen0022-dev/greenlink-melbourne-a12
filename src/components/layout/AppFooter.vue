<script setup>
import { useGreenLink } from '../../composables/useGreenLink.js'

// Footer links use the same navigation adapter as the rest of the application.
const { goToPage } = useGreenLink()
</script>

<template>
  <footer class="site-footer">
    <div>
      <strong>GreenLink Melbourne</strong>
      <p>Helping residents explore green spaces, grow native plants, and support biodiversity.</p>
    </div>
    <button type="button" @click="goToPage('account')">My Account</button>
  </footer>
</template>
