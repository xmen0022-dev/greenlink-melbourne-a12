<script setup>
import InteractiveTable from '../components/common/InteractiveTable.vue'
import RatingPanel from '../components/common/RatingPanel.vue'
import { useGreenLink } from '../composables/useGreenLink.js'

const {
  activeSpaceType, averageRating, filteredSpaces, isSaved, ratingCount, searchInput, showDetail,
  spaceTypes, spaceView, toggleSaved,
} = useGreenLink()

const spaceColumns = [
  { key: 'name', label: 'Name' },
  { key: 'suburb', label: 'Suburb' },
  { key: 'type', label: 'Type' },
  { key: 'summary', label: 'Description' },
  { key: 'rating', label: 'Rating', value: (space) => averageRating('space', space.id) },
  { key: 'actions', label: 'Actions', sortable: false, searchable: false },
]
</script>

<template>
  <section class="content-section page-section">
    <div class="section-heading"><p class="eyebrow">Explore Green Spaces</p><h2>Find parks, gardens, and nature reserves.</h2></div>
    <div class="filter-panel">
      <div class="form-field">
        <label for="space-search">Search by suburb or name</label>
        <div class="search-row"><input id="space-search" v-model="searchInput" type="search" placeholder="Enter suburb" /><button class="button primary" type="button">Search</button></div>
      </div>
      <div class="control-row"><span>Filter:</span><button v-for="type in spaceTypes" :key="type" type="button" :class="{ active: activeSpaceType === type }" @click="activeSpaceType = type">{{ type }}</button></div>
      <div class="control-row"><span>View:</span><button type="button" :class="{ active: spaceView === 'map' }" @click="spaceView = 'map'">Map View</button><button type="button" :class="{ active: spaceView === 'list' }" @click="spaceView = 'list'">List View</button><button type="button" :class="{ active: spaceView === 'table' }" @click="spaceView = 'table'">Table View</button></div>
    </div>
    <div v-if="spaceView === 'map'" class="placeholder-map"><span v-for="space in filteredSpaces" :key="space.id" class="map-point" :style="{ left: space.x, top: space.y }">{{ space.name }}</span></div>
    <InteractiveTable v-if="spaceView === 'table'" :rows="filteredSpaces" :columns="spaceColumns" caption="Melbourne green spaces" :page-size="10">
      <template #cell-rating="{ row, value }">{{ value }} / 5 ({{ ratingCount('space', row.id) }})</template>
      <template #cell-actions="{ row }"><div class="table-actions"><button type="button" @click="showDetail('space', row.id)">View</button><button type="button" @click="toggleSaved('space', row.id)">{{ isSaved('space', row.id) ? 'Saved' : 'Save' }}</button></div></template>
    </InteractiveTable>
    <div v-else class="action-grid" :class="{ 'list-layout': spaceView === 'list' }">
      <article v-for="space in filteredSpaces" :key="space.id" class="action-card">
        <h3>{{ space.name }}</h3><p>{{ space.suburb }} - {{ space.type }}</p><p>{{ space.summary }}</p>
        <RatingPanel type="space" :item-id="space.id" compact />
        <div class="card-actions"><button type="button" @click="showDetail('space', space.id)">View Details</button><button type="button" @click="toggleSaved('space', space.id)">{{ isSaved('space', space.id) ? 'Saved' : 'Save' }}</button></div>
      </article>
    </div>
  </section>
</template>
