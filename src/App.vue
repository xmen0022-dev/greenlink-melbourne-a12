<script setup>
import { computed, ref } from 'vue'

const pages = [
  { id: 'home', label: 'Home' },
  { id: 'spaces', label: 'Explore Green Spaces' },
  { id: 'plants', label: 'Plant Finder' },
  { id: 'events', label: 'Community Events' },
  { id: 'learn', label: 'Learn' },
  { id: 'account', label: 'My Account' },
]

const greenSpaces = [
  {
    id: 1,
    name: 'Royal Park',
    suburb: 'Parkville',
    type: 'Park',
    summary: 'Large urban parkland with native planting areas and habitat corridors.',
    detail: 'Royal Park supports urban cooling, local recreation, and habitat for native birds and insects.',
    x: '42%',
    y: '28%',
  },
  {
    id: 2,
    name: 'Carlton Gardens',
    suburb: 'Carlton',
    type: 'Park',
    summary: 'Historic garden space with mature trees and shaded walking paths.',
    detail: 'Carlton Gardens shows how established tree canopy can improve city comfort and biodiversity.',
    x: '54%',
    y: '40%',
  },
  {
    id: 3,
    name: 'CERES Community Environment Park',
    suburb: 'Brunswick East',
    type: 'Community Garden',
    summary: 'Community education site focused on gardens, composting, and local ecology.',
    detail: 'CERES connects residents with hands-on urban greening, biodiversity learning, and community action.',
    x: '36%',
    y: '36%',
  },
  {
    id: 4,
    name: 'Merri Creek Reserve',
    suburb: 'Northcote',
    type: 'Nature Reserve',
    summary: 'Creek-side habitat restoration area with native grasses and shrubs.',
    detail: 'Merri Creek Reserve is useful for biodiversity protection, waterway care, and native habitat recovery.',
    x: '48%',
    y: '62%',
  },
]

const nativePlants = [
  {
    id: 101,
    name: 'Kangaroo Paw',
    sunlight: 'Full Sun',
    garden: 'Small Garden',
    type: 'Flower',
    summary: 'Attracts native birds and insects including honeyeaters and native bees.',
    detail: 'A strong option for sunny gardens where residents want colour and pollinator support.',
  },
  {
    id: 102,
    name: 'Native Violet',
    sunlight: 'Partial Shade',
    garden: 'Balcony',
    type: 'Groundcover',
    summary: 'Provides dense ground cover that supports insects and small wildlife.',
    detail: 'A low-growing plant for shaded pots, balconies, and small habitat patches.',
  },
  {
    id: 103,
    name: 'Bottlebrush',
    sunlight: 'Full Sun',
    garden: 'Backyard',
    type: 'Shrub',
    summary: 'Excellent nectar source for honeyeaters, lorikeets, and native bees.',
    detail: 'Bottlebrush works well in larger spaces and supports visible biodiversity in suburban gardens.',
  },
  {
    id: 104,
    name: 'Silver Banksia',
    sunlight: 'Full Sun',
    garden: 'Backyard',
    type: 'Tree',
    summary: 'Native tree that supports birds and improves local canopy cover.',
    detail: 'A good tree-planting choice for residents who have enough space for a larger native plant.',
  },
]

const communityEvents = [
  {
    id: 201,
    date: 'Sat 29 Aug',
    dateGroup: 'This month',
    title: 'Royal Park Tree Planting Day',
    location: 'Parkville',
    tag: 'Tree Planting',
    summary: 'Help plant native trees and shrubs to improve shade and wildlife habitat.',
  },
  {
    id: 202,
    date: 'Sun 6 Sep',
    dateGroup: 'Next month',
    title: 'CERES Biodiversity Workshop',
    location: 'Brunswick East',
    tag: 'Biodiversity',
    summary: 'Learn simple ways to support insects, birds, and native plants at home.',
  },
  {
    id: 203,
    date: 'Tue 15 Sep',
    dateGroup: 'Next month',
    title: 'Carlton Gardens Community Garden Session',
    location: 'Carlton',
    tag: 'Community Gardening',
    summary: 'Join a practical gardening session focused on soil, seedlings, and shared green space.',
  },
  {
    id: 204,
    date: 'Sat 26 Sep',
    dateGroup: 'Next month',
    title: 'Merri Creek Habitat Care Morning',
    location: 'Northcote',
    tag: 'Biodiversity',
    summary: 'Remove weeds and protect native habitat along the creek corridor.',
  },
]

const learningTopics = [
  {
    id: 301,
    title: 'Urban Greening',
    summary: 'Learn how trees and green spaces support healthier cities.',
  },
  {
    id: 302,
    title: 'Native Biodiversity',
    summary: 'Learn why local plants and wildlife are important.',
  },
  {
    id: 303,
    title: 'Tree Planting Basics',
    summary: 'Understand how to choose, plant, and care for young trees.',
  },
  {
    id: 304,
    title: 'Small Space Gardening',
    summary: 'Use balconies and small gardens to create useful habitat.',
  },
]

const impactStats = [
  { value: '48', label: 'green spaces listed' },
  { value: '1,280+', label: 'native plants matched' },
  { value: '22', label: 'suburbs covered' },
]

const quickActions = [
  {
    title: 'Explore',
    text: 'Find parks, gardens, and nature reserves around Melbourne.',
    cta: 'Explore Green Spaces',
    page: 'spaces',
  },
  {
    title: 'Grow',
    text: 'Find native plants suitable for your available space.',
    cta: 'Open Plant Finder',
    page: 'plants',
  },
  {
    title: 'Participate',
    text: 'Find tree-planting, gardening, and biodiversity activities.',
    cta: 'Browse Events',
    page: 'events',
  },
]

const loginForm = ref({
  email: '',
  password: '',
})

const interestForm = ref({
  name: '',
  email: '',
  suburb: '',
  interest: '',
})

const loginErrors = ref({
  email: null,
  password: null,
})

const interestErrors = ref({
  name: null,
  email: null,
  suburb: null,
  interest: null,
})

const isLoggedIn = ref(false)
const activePage = ref('home')
const detailItem = ref(null)
const interestSuccess = ref(false)
const searchInput = ref('')
const activeSpaceType = ref('All')
const spaceView = ref('map')
const selectedSunlight = ref([])
const selectedGardenTypes = ref([])
const selectedPlantTypes = ref([])
const hasSearchedPlants = ref(false)
const eventLocation = ref('All Locations')
const eventDate = ref('All Dates')
const selectedEventTypes = ref([])
const savedItems = ref([])
const registeredEventIds = ref([])

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const spaceTypes = ['All', 'Park', 'Community Garden', 'Nature Reserve']
const sunlightOptions = ['Full Sun', 'Partial Shade', 'Shade']
const gardenOptions = ['Balcony', 'Small Garden', 'Backyard']
const plantOptions = ['Tree', 'Shrub', 'Flower', 'Groundcover']
const eventTypes = ['Tree Planting', 'Community Gardening', 'Biodiversity', 'Workshop']
const eventLocations = ['All Locations', 'Parkville', 'Brunswick East', 'Carlton', 'Northcote']
const eventDates = ['All Dates', 'This month', 'Next month']

const filteredSpaces = computed(() => {
  const search = searchInput.value.trim().toLowerCase()

  return greenSpaces.filter((space) => {
    const matchesType = activeSpaceType.value === 'All' || space.type === activeSpaceType.value
    const matchesSearch =
      !search ||
      space.name.toLowerCase().includes(search) ||
      space.suburb.toLowerCase().includes(search)

    return matchesType && matchesSearch
  })
})

const filteredPlants = computed(() => {
  if (!hasSearchedPlants.value) {
    return []
  }

  return nativePlants.filter((plant) => {
    const matchesSunlight =
      selectedSunlight.value.length === 0 || selectedSunlight.value.includes(plant.sunlight)
    const matchesGarden =
      selectedGardenTypes.value.length === 0 || selectedGardenTypes.value.includes(plant.garden)
    const matchesType =
      selectedPlantTypes.value.length === 0 || selectedPlantTypes.value.includes(plant.type)

    return matchesSunlight && matchesGarden && matchesType
  })
})

const filteredEvents = computed(() => {
  return communityEvents.filter((event) => {
    const matchesLocation = eventLocation.value === 'All Locations' || event.location === eventLocation.value
    const matchesDate = eventDate.value === 'All Dates' || event.dateGroup === eventDate.value
    const matchesType =
      selectedEventTypes.value.length === 0 || selectedEventTypes.value.includes(event.tag)

    return matchesLocation && matchesDate && matchesType
  })
})

const savedSpaces = computed(() => greenSpaces.filter((item) => isSaved('space', item.id)))
const savedPlants = computed(() => nativePlants.filter((item) => isSaved('plant', item.id)))
const savedEvents = computed(() => communityEvents.filter((item) => isSaved('event', item.id)))
const registeredEvents = computed(() => communityEvents.filter((event) => registeredEventIds.value.includes(event.id)))

const detailData = computed(() => {
  if (!detailItem.value) {
    return null
  }

  const source = {
    space: greenSpaces,
    plant: nativePlants,
    event: communityEvents,
    learn: learningTopics,
  }[detailItem.value.type]

  return source.find((item) => item.id === detailItem.value.id)
})

const validateLoginEmail = (blur) => {
  const email = loginForm.value.email.trim()

  if (!email) {
    if (blur) {
      loginErrors.value.email = 'Email is required.'
    }
  } else if (!emailPattern.test(email)) {
    if (blur) {
      loginErrors.value.email = 'Enter a valid email address.'
    }
  } else {
    loginErrors.value.email = null
  }
}

const validateLoginPassword = (blur) => {
  const password = loginForm.value.password

  if (!password) {
    if (blur) {
      loginErrors.value.password = 'Password is required.'
    }
  } else if (password.length < 6) {
    if (blur) {
      loginErrors.value.password = 'Password must be at least 6 characters.'
    }
  } else {
    loginErrors.value.password = null
  }
}

const validateInterestName = (blur) => {
  if (interestForm.value.name.trim().length < 2) {
    if (blur) {
      interestErrors.value.name = 'Name must be at least 2 characters.'
    }
  } else {
    interestErrors.value.name = null
  }
}

const validateInterestEmail = (blur) => {
  const email = interestForm.value.email.trim()

  if (!email) {
    if (blur) {
      interestErrors.value.email = 'Email is required.'
    }
  } else if (!emailPattern.test(email)) {
    if (blur) {
      interestErrors.value.email = 'Enter a valid email address.'
    }
  } else {
    interestErrors.value.email = null
  }
}

const validateSuburb = (blur) => {
  if (interestForm.value.suburb.trim().length < 3) {
    if (blur) {
      interestErrors.value.suburb = 'Suburb must be at least 3 characters.'
    }
  } else {
    interestErrors.value.suburb = null
  }
}

const validateInterestArea = (blur) => {
  if (!interestForm.value.interest) {
    if (blur) {
      interestErrors.value.interest = 'Choose an interest area.'
    }
  } else {
    interestErrors.value.interest = null
  }
}

function goToPage(page) {
  activePage.value = page
  detailItem.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showDetail(type, id) {
  detailItem.value = { type, id }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeDetail() {
  detailItem.value = null
}

function submitLogin() {
  validateLoginEmail(true)
  validateLoginPassword(true)

  if (loginErrors.value.email || loginErrors.value.password) {
    return
  }

  isLoggedIn.value = true
  activePage.value = 'home'
}

function logout() {
  isLoggedIn.value = false
  activePage.value = 'home'
  detailItem.value = null
  loginForm.value.password = ''
  loginErrors.value.email = null
  loginErrors.value.password = null
}

function submitInterest() {
  interestSuccess.value = false
  validateInterestName(true)
  validateInterestEmail(true)
  validateSuburb(true)
  validateInterestArea(true)

  if (
    interestErrors.value.name ||
    interestErrors.value.email ||
    interestErrors.value.suburb ||
    interestErrors.value.interest
  ) {
    return
  }

  interestSuccess.value = true
  interestForm.value = {
    name: '',
    email: '',
    suburb: '',
    interest: '',
  }
  interestErrors.value = {
    name: null,
    email: null,
    suburb: null,
    interest: null,
  }
}

function findPlants() {
  hasSearchedPlants.value = true
}

function resetPlantFilters() {
  selectedSunlight.value = []
  selectedGardenTypes.value = []
  selectedPlantTypes.value = []
  hasSearchedPlants.value = false
}

function toggleSaved(type, id) {
  const key = `${type}-${id}`

  if (savedItems.value.includes(key)) {
    savedItems.value = savedItems.value.filter((item) => item !== key)
  } else {
    savedItems.value.push(key)
  }
}

function isSaved(type, id) {
  return savedItems.value.includes(`${type}-${id}`)
}

function registerEvent(id) {
  if (!registeredEventIds.value.includes(id)) {
    registeredEventIds.value.push(id)
  }
}
</script>

<template>
  <div class="app-shell">
    <main v-if="!isLoggedIn" class="login-page">
      <section class="login-card" aria-labelledby="login-heading">
        <div class="login-copy">
          <span class="brand-mark">GL</span>
          <p class="eyebrow">GreenLink Melbourne</p>
          <h1 id="login-heading">Sign in to your community dashboard.</h1>
          <p>Explore urban greening projects, native plant ideas, and biodiversity events around Melbourne.</p>
        </div>

        <form class="interest-form" novalidate @submit.prevent="submitLogin">
          <div class="form-field">
            <label for="login-email">Email address</label>
            <input
              id="login-email"
              v-model="loginForm.email"
              type="email"
              autocomplete="email"
              :aria-invalid="Boolean(loginErrors.email)"
              aria-describedby="login-email-error"
              @blur="() => validateLoginEmail(true)"
              @input="() => validateLoginEmail(false)"
            />
            <p v-if="loginErrors.email" id="login-email-error" class="field-error">{{ loginErrors.email }}</p>
          </div>

          <div class="form-field">
            <label for="login-password">Password</label>
            <input
              id="login-password"
              v-model="loginForm.password"
              type="password"
              autocomplete="current-password"
              :aria-invalid="Boolean(loginErrors.password)"
              aria-describedby="login-password-error"
              @blur="() => validateLoginPassword(true)"
              @input="() => validateLoginPassword(false)"
            />
            <p v-if="loginErrors.password" id="login-password-error" class="field-error">{{ loginErrors.password }}</p>
          </div>

          <button class="button primary form-submit" type="submit">Sign in</button>
          <p class="demo-note">Demo only: use any valid email and a password with 6+ characters.</p>
        </form>
      </section>
    </main>

    <template v-else>
      <header class="site-header">
        <button class="brand brand-button" type="button" @click="goToPage('home')">
          <span class="brand-mark">GL</span>
          <span>GreenLink Melbourne</span>
        </button>

        <nav class="main-nav" aria-label="Primary navigation">
          <button
            v-for="page in pages"
            :key="page.id"
            type="button"
            :class="{ active: activePage === page.id }"
            @click="goToPage(page.id)"
          >
            {{ page.label }}
          </button>
        </nav>

        <button class="logout-button" type="button" @click="logout">Log out</button>
      </header>

      <main>
        <section v-if="detailData" class="content-section page-section">
          <div class="detail-card">
            <button class="text-button" type="button" @click="closeDetail">Back</button>
            <p class="eyebrow">Details</p>
            <h2>{{ detailData.name || detailData.title }}</h2>
            <p>{{ detailData.detail || detailData.summary }}</p>
            <p v-if="detailData.suburb">Location: {{ detailData.suburb }}</p>
            <p v-if="detailData.location">Location: {{ detailData.location }}</p>
            <p v-if="detailData.date">Date: {{ detailData.date }}</p>
            <p v-if="detailData.tag">Type: {{ detailData.tag }}</p>
            <div class="hero-actions">
              <button
                v-if="detailItem.type !== 'learn'"
                class="button secondary"
                type="button"
                @click="toggleSaved(detailItem.type, detailItem.id)"
              >
                {{ isSaved(detailItem.type, detailItem.id) ? 'Saved' : 'Save' }}
              </button>
              <button
                v-if="detailItem.type === 'event'"
                class="button primary"
                type="button"
                :disabled="registeredEventIds.includes(detailItem.id)"
                @click="registerEvent(detailItem.id)"
              >
                {{ registeredEventIds.includes(detailItem.id) ? 'Registered' : 'Register Interest' }}
              </button>
            </div>
          </div>
        </section>

        <template v-else>
          <section v-if="activePage === 'home'" class="hero-section">
            <div class="hero-copy">
              <p class="eyebrow">Urban greening and biodiversity</p>
              <h1>Make Melbourne greener together.</h1>
              <p class="hero-text">
                Explore local green spaces, discover suitable native plants, and join community activities
                that support tree planting and biodiversity.
              </p>

              <div class="hero-actions" aria-label="Primary actions">
                <button class="button primary" type="button" @click="goToPage('spaces')">Explore Green Spaces</button>
                <button class="button secondary" type="button" @click="goToPage('plants')">Find Native Plants</button>
                <button class="button secondary" type="button" @click="goToPage('events')">View Events</button>
              </div>
            </div>

            <div class="hero-panel" aria-label="Current GreenLink snapshot">
              <div class="map-card">
                <div class="map-header">
                  <span>Melbourne green network</span>
                  <strong>Live</strong>
                </div>
                <div class="map-visual">
                  <span class="pin pin-one"></span>
                  <span class="pin pin-two"></span>
                  <span class="pin pin-three"></span>
                  <span class="route route-one"></span>
                  <span class="route route-two"></span>
                </div>
              </div>
              <div class="hero-note">
                <strong>Next event</strong>
                <span>Tree planting registrations are open this week.</span>
              </div>
            </div>
          </section>

          <section v-if="activePage === 'home'" class="stats-strip" aria-label="GreenLink impact">
            <div v-for="stat in impactStats" :key="stat.label">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </section>

          <section v-if="activePage === 'home'" class="content-section">
            <div class="section-heading">
              <p class="eyebrow">Start here</p>
              <h2>What would you like to do?</h2>
            </div>

            <div class="action-grid">
              <article v-for="action in quickActions" :key="action.title" class="action-card">
                <h3>{{ action.title }}</h3>
                <p>{{ action.text }}</p>
                <button type="button" @click="goToPage(action.page)">{{ action.cta }}</button>
              </article>
            </div>
          </section>

          <section v-if="activePage === 'spaces'" class="content-section page-section">
            <div class="section-heading">
              <p class="eyebrow">Explore Green Spaces</p>
              <h2>Find parks, gardens, and nature reserves.</h2>
            </div>

            <div class="filter-panel">
              <div class="form-field">
                <label for="space-search">Search by suburb or name</label>
                <div class="search-row">
                  <input id="space-search" v-model="searchInput" type="search" placeholder="Enter suburb" />
                  <button class="button primary" type="button">Search</button>
                </div>
              </div>

              <div class="control-row">
                <span>Filter:</span>
                <button
                  v-for="type in spaceTypes"
                  :key="type"
                  type="button"
                  :class="{ active: activeSpaceType === type }"
                  @click="activeSpaceType = type"
                >
                  {{ type }}
                </button>
              </div>

              <div class="control-row">
                <span>View:</span>
                <button type="button" :class="{ active: spaceView === 'map' }" @click="spaceView = 'map'">
                  Map View
                </button>
                <button type="button" :class="{ active: spaceView === 'list' }" @click="spaceView = 'list'">
                  List View
                </button>
              </div>
            </div>

            <div v-if="spaceView === 'map'" class="placeholder-map">
              <span
                v-for="space in filteredSpaces"
                :key="space.id"
                class="map-point"
                :style="{ left: space.x, top: space.y }"
              >
                {{ space.name }}
              </span>
            </div>

            <div class="action-grid" :class="{ 'list-layout': spaceView === 'list' }">
              <article v-for="space in filteredSpaces" :key="space.id" class="action-card">
                <h3>{{ space.name }}</h3>
                <p>{{ space.suburb }} - {{ space.type }}</p>
                <p>{{ space.summary }}</p>
                <div class="card-actions">
                  <button type="button" @click="showDetail('space', space.id)">View Details</button>
                  <button type="button" @click="toggleSaved('space', space.id)">
                    {{ isSaved('space', space.id) ? 'Saved' : 'Save' }}
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section v-if="activePage === 'plants'" class="content-section page-section">
            <div class="section-heading">
              <p class="eyebrow">Plant Finder</p>
              <h2>Find native plants for your space.</h2>
            </div>

            <div class="filter-panel filter-columns">
              <fieldset>
                <legend>Sunlight</legend>
                <label v-for="option in sunlightOptions" :key="option">
                  <input v-model="selectedSunlight" type="checkbox" :value="option" />
                  {{ option }}
                </label>
              </fieldset>

              <fieldset>
                <legend>Garden Type</legend>
                <label v-for="option in gardenOptions" :key="option">
                  <input v-model="selectedGardenTypes" type="checkbox" :value="option" />
                  {{ option }}
                </label>
              </fieldset>

              <fieldset>
                <legend>Plant Type</legend>
                <label v-for="option in plantOptions" :key="option">
                  <input v-model="selectedPlantTypes" type="checkbox" :value="option" />
                  {{ option }}
                </label>
              </fieldset>

              <div class="filter-actions">
                <button class="button primary" type="button" @click="findPlants">Find Plants</button>
                <button class="button secondary" type="button" @click="resetPlantFilters">Reset Filters</button>
              </div>
            </div>

            <p v-if="!hasSearchedPlants" class="empty-state">
              Select your preferences above and click Find Plants to see recommendations.
            </p>
            <p v-else-if="filteredPlants.length === 0" class="empty-state">No plants match the selected filters.</p>

            <div v-else class="action-grid">
              <article v-for="plant in filteredPlants" :key="plant.id" class="action-card">
                <h3>{{ plant.name }}</h3>
                <p>{{ plant.sunlight }} - {{ plant.garden }} - {{ plant.type }}</p>
                <p>{{ plant.summary }}</p>
                <div class="card-actions">
                  <button type="button" @click="showDetail('plant', plant.id)">View Details</button>
                  <button type="button" @click="toggleSaved('plant', plant.id)">
                    {{ isSaved('plant', plant.id) ? 'Saved' : 'Save' }}
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section v-if="activePage === 'events'" class="content-section events-section page-section">
            <div class="section-heading">
              <p class="eyebrow">Community Events</p>
              <h2>Join local greening and biodiversity activities.</h2>
            </div>

            <div class="filter-panel filter-columns">
              <div class="form-field">
                <label for="event-location">Location</label>
                <select id="event-location" v-model="eventLocation">
                  <option v-for="location in eventLocations" :key="location" :value="location">{{ location }}</option>
                </select>
              </div>

              <div class="form-field">
                <label for="event-date">Date</label>
                <select id="event-date" v-model="eventDate">
                  <option v-for="date in eventDates" :key="date" :value="date">{{ date }}</option>
                </select>
              </div>

              <fieldset>
                <legend>Event Type</legend>
                <label v-for="type in eventTypes" :key="type">
                  <input v-model="selectedEventTypes" type="checkbox" :value="type" />
                  {{ type }}
                </label>
              </fieldset>
            </div>

            <div class="event-list">
              <article v-for="event in filteredEvents" :key="event.id" class="event-item">
                <div>
                  <span class="event-date">{{ event.date }}</span>
                  <h3>{{ event.title }}</h3>
                  <p>{{ event.location }}</p>
                  <p>{{ event.summary }}</p>
                </div>
                <div class="event-actions">
                  <span class="event-tag">{{ event.tag }}</span>
                  <button type="button" @click="showDetail('event', event.id)">View Details</button>
                  <button type="button" @click="toggleSaved('event', event.id)">
                    {{ isSaved('event', event.id) ? 'Saved' : 'Save' }}
                  </button>
                  <button
                    type="button"
                    :disabled="registeredEventIds.includes(event.id)"
                    @click="registerEvent(event.id)"
                  >
                    {{ registeredEventIds.includes(event.id) ? 'Registered' : 'Register Interest' }}
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section v-if="activePage === 'learn'" class="content-section page-section">
            <div class="section-heading">
              <p class="eyebrow">Learn</p>
              <h2>Learn about urban greening and biodiversity.</h2>
            </div>

            <div class="action-grid">
              <article v-for="topic in learningTopics" :key="topic.id" class="action-card">
                <h3>{{ topic.title }}</h3>
                <p>{{ topic.summary }}</p>
                <button type="button" @click="showDetail('learn', topic.id)">Read More</button>
              </article>
            </div>
          </section>

          <section v-if="activePage === 'account'" class="content-section page-section">
            <div class="section-heading">
              <p class="eyebrow">My Account</p>
              <h2>Your saved items and registrations.</h2>
            </div>

            <div class="account-grid">
              <article class="action-card">
                <h3>Saved Green Spaces</h3>
                <p v-if="savedSpaces.length === 0">No saved green spaces yet.</p>
                <button v-for="space in savedSpaces" :key="space.id" type="button" @click="showDetail('space', space.id)">
                  {{ space.name }}
                </button>
              </article>

              <article class="action-card">
                <h3>Saved Plants</h3>
                <p v-if="savedPlants.length === 0">No saved plants yet.</p>
                <button v-for="plant in savedPlants" :key="plant.id" type="button" @click="showDetail('plant', plant.id)">
                  {{ plant.name }}
                </button>
              </article>

              <article class="action-card">
                <h3>Saved Events</h3>
                <p v-if="savedEvents.length === 0">No saved events yet.</p>
                <button v-for="event in savedEvents" :key="event.id" type="button" @click="showDetail('event', event.id)">
                  {{ event.title }}
                </button>
              </article>

              <article class="action-card">
                <h3>Registered Events</h3>
                <p v-if="registeredEvents.length === 0">No event registrations yet.</p>
                <button
                  v-for="event in registeredEvents"
                  :key="event.id"
                  type="button"
                  @click="showDetail('event', event.id)"
                >
                  {{ event.title }}
                </button>
              </article>
            </div>
          </section>

          <section v-if="activePage === 'account'" class="form-section">
            <div class="form-copy">
              <p class="eyebrow">Register interest</p>
              <h2>Tell us what kind of local action suits you.</h2>
              <p>This demo form validates user input before saving a volunteer interest request.</p>
            </div>

            <form class="interest-form" novalidate @submit.prevent="submitInterest">
              <div class="form-field">
                <label for="name">Full name</label>
                <input
                  id="name"
                  v-model="interestForm.name"
                  type="text"
                  autocomplete="name"
                  :aria-invalid="Boolean(interestErrors.name)"
                  aria-describedby="name-error"
                  @blur="() => validateInterestName(true)"
                  @input="() => validateInterestName(false)"
                />
                <p v-if="interestErrors.name" id="name-error" class="field-error">{{ interestErrors.name }}</p>
              </div>

              <div class="form-field">
                <label for="email">Email address</label>
                <input
                  id="email"
                  v-model="interestForm.email"
                  type="email"
                  autocomplete="email"
                  :aria-invalid="Boolean(interestErrors.email)"
                  aria-describedby="email-error"
                  @blur="() => validateInterestEmail(true)"
                  @input="() => validateInterestEmail(false)"
                />
                <p v-if="interestErrors.email" id="email-error" class="field-error">{{ interestErrors.email }}</p>
              </div>

              <div class="form-field">
                <label for="suburb">Suburb</label>
                <input
                  id="suburb"
                  v-model="interestForm.suburb"
                  type="text"
                  autocomplete="address-level2"
                  :aria-invalid="Boolean(interestErrors.suburb)"
                  aria-describedby="suburb-error"
                  @blur="() => validateSuburb(true)"
                  @input="() => validateSuburb(false)"
                />
                <p v-if="interestErrors.suburb" id="suburb-error" class="field-error">{{ interestErrors.suburb }}</p>
              </div>

              <div class="form-field">
                <label for="interest">Interest area</label>
                <select
                  id="interest"
                  v-model="interestForm.interest"
                  :aria-invalid="Boolean(interestErrors.interest)"
                  aria-describedby="interest-error"
                  @blur="() => validateInterestArea(true)"
                  @change="() => validateInterestArea(false)"
                >
                  <option value="">Select one</option>
                  <option value="tree-planting">Tree planting</option>
                  <option value="native-plants">Native planting</option>
                  <option value="biodiversity">Biodiversity monitoring</option>
                  <option value="community-garden">Community gardening</option>
                </select>
                <p v-if="interestErrors.interest" id="interest-error" class="field-error">
                  {{ interestErrors.interest }}
                </p>
              </div>

              <button class="button primary form-submit" type="submit">Submit interest</button>

              <p v-if="interestSuccess" class="form-success" role="status">
                Thanks. Your volunteer interest has been recorded for this demo.
              </p>
            </form>
          </section>
        </template>
      </main>

      <footer class="site-footer">
        <div>
          <strong>GreenLink Melbourne</strong>
          <p>Helping residents explore green spaces, grow native plants, and support biodiversity.</p>
        </div>
        <button type="button" @click="goToPage('account')">My Account</button>
      </footer>
    </template>
  </div>
</template>
