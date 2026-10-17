<script setup>
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { useGreenLink } from './composables/useGreenLink.js'
import AccountView from './views/AccountView.vue'
import AuthView from './views/AuthView.vue'
import DetailView from './views/DetailView.vue'
import EventsView from './views/EventsView.vue'
import GreenSpacesView from './views/GreenSpacesView.vue'
import HomeView from './views/HomeView.vue'
import LearnView from './views/LearnView.vue'
import PlantFinderView from './views/PlantFinderView.vue'

const { activePage, detailData } = useGreenLink()

const pageComponents = {
  home: HomeView,
  spaces: GreenSpacesView,
  plants: PlantFinderView,
  events: EventsView,
  learn: LearnView,
  account: AccountView,
}
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <DetailView v-if="detailData" />
      <AuthView v-else-if="activePage === 'auth'" />
      <component :is="pageComponents[activePage]" v-else />
    </main>
    <AppFooter />
  </div>
</template>
