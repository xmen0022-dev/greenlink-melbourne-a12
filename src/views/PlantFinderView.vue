<script setup>
import RatingPanel from '../components/common/RatingPanel.vue'
import { useGreenLink } from '../composables/useGreenLink.js'

const {
  filteredPlants, findPlants, gardenOptions, hasSearchedPlants, isSaved,
  plantOptions, resetPlantFilters, selectedGardenTypes, selectedPlantTypes,
  selectedSunlight, showDetail, sunlightOptions, toggleSaved,
} = useGreenLink()
</script>

<template>
  <section class="content-section page-section">
    <div class="section-heading"><p class="eyebrow">Plant Finder</p><h2>Find native plants for your space.</h2></div>
    <div class="filter-panel filter-columns">
      <fieldset><legend>Sunlight</legend><label v-for="option in sunlightOptions" :key="option"><input v-model="selectedSunlight" type="checkbox" :value="option" />{{ option }}</label></fieldset>
      <fieldset><legend>Garden Type</legend><label v-for="option in gardenOptions" :key="option"><input v-model="selectedGardenTypes" type="checkbox" :value="option" />{{ option }}</label></fieldset>
      <fieldset><legend>Plant Type</legend><label v-for="option in plantOptions" :key="option"><input v-model="selectedPlantTypes" type="checkbox" :value="option" />{{ option }}</label></fieldset>
      <div class="filter-actions"><button class="button primary" type="button" @click="findPlants">Find Plants</button><button class="button secondary" type="button" @click="resetPlantFilters">Reset Filters</button></div>
    </div>
    <p v-if="!hasSearchedPlants" class="empty-state">Select your preferences above and click Find Plants to see recommendations.</p>
    <p v-else-if="filteredPlants.length === 0" class="empty-state">No plants match the selected filters.</p>
    <div v-else class="action-grid">
      <article v-for="plant in filteredPlants" :key="plant.id" class="action-card">
        <h3>{{ plant.name }}</h3><p>{{ plant.sunlight }} - {{ plant.garden }} - {{ plant.type }}</p><p>{{ plant.summary }}</p>
        <RatingPanel type="plant" :item-id="plant.id" compact />
        <div class="card-actions"><button type="button" @click="showDetail('plant', plant.id)">View Details</button><button type="button" @click="toggleSaved('plant', plant.id)">{{ isSaved('plant', plant.id) ? 'Saved' : 'Save' }}</button></div>
      </article>
    </div>
  </section>
</template>
