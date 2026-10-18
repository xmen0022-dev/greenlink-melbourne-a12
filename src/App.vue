<script setup>
import { RouterView } from 'vue-router'
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'

// The root component provides the shared page shell around routed content.
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
