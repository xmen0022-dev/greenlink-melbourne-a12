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
  { id: 1, name: 'Royal Park', suburb: 'Parkville', type: 'Park', summary: 'Large urban parkland with native planting areas and habitat corridors.', detail: 'Royal Park supports urban cooling, local recreation, and habitat for native birds and insects.', x: '42%', y: '28%' },
  { id: 2, name: 'Carlton Gardens', suburb: 'Carlton', type: 'Park', summary: 'Historic garden space with mature trees and shaded walking paths.', detail: 'Carlton Gardens shows how established tree canopy can improve city comfort and biodiversity.', x: '54%', y: '40%' },
  { id: 3, name: 'CERES Community Environment Park', suburb: 'Brunswick East', type: 'Community Garden', summary: 'Community education site focused on gardens, composting, and local ecology.', detail: 'CERES connects residents with hands-on urban greening, biodiversity learning, and community action.', x: '36%', y: '36%' },
  { id: 4, name: 'Merri Creek Reserve', suburb: 'Northcote', type: 'Nature Reserve', summary: 'Creek-side habitat restoration area with native grasses and shrubs.', detail: 'Merri Creek Reserve is useful for biodiversity protection, waterway care, and native habitat recovery.', x: '48%', y: '62%' },
]

const nativePlants = [
  { id: 101, name: 'Kangaroo Paw', sunlight: 'Full Sun', garden: 'Small Garden', type: 'Flower', summary: 'Attracts native birds and insects including honeyeaters and native bees.', detail: 'A strong option for sunny gardens where residents want colour and pollinator support.' },
  { id: 102, name: 'Native Violet', sunlight: 'Partial Shade', garden: 'Balcony', type: 'Groundcover', summary: 'Provides dense ground cover that supports insects and small wildlife.', detail: 'A low-growing plant for shaded pots, balconies, and small habitat patches.' },
  { id: 103, name: 'Bottlebrush', sunlight: 'Full Sun', garden: 'Backyard', type: 'Shrub', summary: 'Excellent nectar source for honeyeaters, lorikeets, and native bees.', detail: 'Bottlebrush works well in larger spaces and supports visible biodiversity in suburban gardens.' },
  { id: 104, name: 'Silver Banksia', sunlight: 'Full Sun', garden: 'Backyard', type: 'Tree', summary: 'Native tree that supports birds and improves local canopy cover.', detail: 'A good tree-planting choice for residents who have enough space for a larger native plant.' },
]

const initialEvents = [
  { id: 201, date: 'Sat 29 Aug', dateGroup: 'This month', title: 'Royal Park Tree Planting Day', location: 'Parkville', tag: 'Tree Planting', summary: 'Help plant native trees and shrubs to improve shade and wildlife habitat.' },
  { id: 202, date: 'Sun 6 Sep', dateGroup: 'Next month', title: 'CERES Biodiversity Workshop', location: 'Brunswick East', tag: 'Biodiversity', summary: 'Learn simple ways to support insects, birds, and native plants at home.' },
  { id: 203, date: 'Tue 15 Sep', dateGroup: 'Next month', title: 'Carlton Gardens Community Garden Session', location: 'Carlton', tag: 'Community Gardening', summary: 'Join a practical gardening session focused on soil, seedlings, and shared green space.' },
  { id: 204, date: 'Sat 26 Sep', dateGroup: 'Next month', title: 'Merri Creek Habitat Care Morning', location: 'Northcote', tag: 'Biodiversity', summary: 'Remove weeds and protect native habitat along the creek corridor.' },
]

const learningTopics = [
  { id: 301, title: 'Urban Greening', summary: 'Learn how trees and green spaces support healthier cities.' },
  { id: 302, title: 'Native Biodiversity', summary: 'Learn why local plants and wildlife are important.' },
  { id: 303, title: 'Tree Planting Basics', summary: 'Understand how to choose, plant, and care for young trees.' },
  { id: 304, title: 'Small Space Gardening', summary: 'Use balconies and small gardens to create useful habitat.' },
]

const impactStats = [
  { value: '48', label: 'green spaces listed' },
  { value: '1,280+', label: 'native plants matched' },
  { value: '22', label: 'suburbs covered' },
]

const quickActions = [
  { title: 'Explore', text: 'Find parks, gardens, and nature reserves around Melbourne.', cta: 'Explore Green Spaces', page: 'spaces' },
  { title: 'Grow', text: 'Find native plants suitable for your available space.', cta: 'Open Plant Finder', page: 'plants' },
  { title: 'Participate', text: 'Find tree-planting, gardening, and biodiversity activities.', cta: 'Browse Events', page: 'events' },
]

const users = ref([
  { id: 1, name: 'GreenLink Resident', email: 'resident@greenlink.test', password: 'Resident1', role: 'resident' },
  { id: 2, name: 'Event Organiser', email: 'organiser@greenlink.test', password: 'Organiser1', role: 'organiser' },
])

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ name: '', email: '', password: '', role: 'resident' })
const interestForm = ref({ name: '', email: '', suburb: '', interest: '' })
const newEventForm = ref({ title: '', location: '', date: '', dateGroup: 'Next month', tag: 'Tree Planting', summary: '' })

const loginErrors = ref({ email: null, password: null, account: null })
const registerErrors = ref({ name: null, email: null, password: null, role: null })
const interestErrors = ref({ name: null, email: null, suburb: null, interest: null })
const eventErrors = ref({ title: null, location: null, date: null, summary: null })

const isLoggedIn = ref(false)
const currentUser = ref(null)
const activePage = ref('home')
const requestedPage = ref('home')
const authMode = ref('login')
const authNotice = ref('')
const isMobileNavOpen = ref(false)
const detailItem = ref(null)
const interestSuccess = ref(false)
const eventSuccess = ref(false)
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
const createdEvents = ref([])
const ratings = ref({
  'space-1': [5, 4],
  'space-2': [4],
  'plant-101': [5],
  'event-201': [4, 5],
})
const ratingInputs = ref({})
const ratingMessages = ref({})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const spaceTypes = ['All', 'Park', 'Community Garden', 'Nature Reserve']
const sunlightOptions = ['Full Sun', 'Partial Shade', 'Shade']
const gardenOptions = ['Balcony', 'Small Garden', 'Backyard']
const plantOptions = ['Tree', 'Shrub', 'Flower', 'Groundcover']
const eventTypes = ['Tree Planting', 'Community Gardening', 'Biodiversity', 'Workshop']
const eventLocations = ['All Locations', 'Parkville', 'Brunswick East', 'Carlton', 'Northcote']
const eventDates = ['All Dates', 'This month', 'Next month']

const communityEvents = computed(() => [...initialEvents, ...createdEvents.value])
const isOrganiser = computed(() => currentUser.value?.role === 'organiser')
const userRoleLabel = computed(() => (currentUser.value?.role === 'organiser' ? 'Organiser' : 'Resident'))

const filteredSpaces = computed(() => {
  const search = searchInput.value.trim().toLowerCase()
  return greenSpaces.filter((space) => {
    const matchesType = activeSpaceType.value === 'All' || space.type === activeSpaceType.value
    const matchesSearch = !search || space.name.toLowerCase().includes(search) || space.suburb.toLowerCase().includes(search)
    return matchesType && matchesSearch
  })
})

const filteredPlants = computed(() => {
  if (!hasSearchedPlants.value) return []
  return nativePlants.filter((plant) => {
    const matchesSunlight = selectedSunlight.value.length === 0 || selectedSunlight.value.includes(plant.sunlight)
    const matchesGarden = selectedGardenTypes.value.length === 0 || selectedGardenTypes.value.includes(plant.garden)
    const matchesType = selectedPlantTypes.value.length === 0 || selectedPlantTypes.value.includes(plant.type)
    return matchesSunlight && matchesGarden && matchesType
  })
})

const filteredEvents = computed(() => {
  return communityEvents.value.filter((event) => {
    const matchesLocation = eventLocation.value === 'All Locations' || event.location === eventLocation.value
    const matchesDate = eventDate.value === 'All Dates' || event.dateGroup === eventDate.value
    const matchesType = selectedEventTypes.value.length === 0 || selectedEventTypes.value.includes(event.tag)
    return matchesLocation && matchesDate && matchesType
  })
})

const savedSpaces = computed(() => greenSpaces.filter((item) => isSaved('space', item.id)))
const savedPlants = computed(() => nativePlants.filter((item) => isSaved('plant', item.id)))
const savedEvents = computed(() => communityEvents.value.filter((item) => isSaved('event', item.id)))
const registeredEvents = computed(() => communityEvents.value.filter((event) => registeredEventIds.value.includes(event.id)))
const organiserEvents = computed(() => createdEvents.value.filter((event) => event.ownerId === currentUser.value?.id))

const detailData = computed(() => {
  if (!detailItem.value) return null
  const source = {
    space: greenSpaces,
    plant: nativePlants,
    event: communityEvents.value,
    learn: learningTopics,
  }[detailItem.value.type]
  return source.find((item) => item.id === detailItem.value.id)
})

function sanitizeInput(value) {
  return String(value).trim().replace(/[<>]/g, '')
}

function validateEmail(value) {
  return emailPattern.test(value.trim())
}

function validatePasswordValue(password) {
  return password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password)
}

function validateLoginEmail(blur) {
  const email = loginForm.value.email.trim()
  if (!email) {
    if (blur) loginErrors.value.email = 'Email is required.'
  } else if (!validateEmail(email)) {
    if (blur) loginErrors.value.email = 'Enter a valid email address.'
  } else {
    loginErrors.value.email = null
  }
}

function validateLoginPassword(blur) {
  const password = loginForm.value.password
  if (!password) {
    if (blur) loginErrors.value.password = 'Password is required.'
  } else if (password.length < 6) {
    if (blur) loginErrors.value.password = 'Password must be at least 6 characters.'
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    if (blur) loginErrors.value.password = 'Password must include both letters and numbers.'
  } else {
    loginErrors.value.password = null
  }
}

function validateRegisterName(blur) {
  if (sanitizeInput(registerForm.value.name).length < 2) {
    if (blur) registerErrors.value.name = 'Name must be at least 2 characters.'
  } else {
    registerErrors.value.name = null
  }
}

function validateRegisterEmail(blur) {
  const email = registerForm.value.email.trim().toLowerCase()
  if (!email) {
    if (blur) registerErrors.value.email = 'Email is required.'
  } else if (!validateEmail(email)) {
    if (blur) registerErrors.value.email = 'Enter a valid email address.'
  } else if (users.value.some((user) => user.email === email)) {
    if (blur) registerErrors.value.email = 'This email is already registered.'
  } else {
    registerErrors.value.email = null
  }
}

function validateRegisterPassword(blur) {
  const password = registerForm.value.password
  if (!password) {
    if (blur) registerErrors.value.password = 'Password is required.'
  } else if (!validatePasswordValue(password)) {
    if (blur) registerErrors.value.password = 'Use at least 6 characters with letters and numbers.'
  } else {
    registerErrors.value.password = null
  }
}

function validateRegisterRole(blur) {
  if (!['resident', 'organiser'].includes(registerForm.value.role)) {
    if (blur) registerErrors.value.role = 'Choose a valid role.'
  } else {
    registerErrors.value.role = null
  }
}

function validateInterestName(blur) {
  if (sanitizeInput(interestForm.value.name).length < 2) {
    if (blur) interestErrors.value.name = 'Name must be at least 2 characters.'
  } else {
    interestErrors.value.name = null
  }
}

function validateInterestEmail(blur) {
  const email = interestForm.value.email.trim()
  if (!email) {
    if (blur) interestErrors.value.email = 'Email is required.'
  } else if (!validateEmail(email)) {
    if (blur) interestErrors.value.email = 'Enter a valid email address.'
  } else {
    interestErrors.value.email = null
  }
}

function validateSuburb(blur) {
  if (sanitizeInput(interestForm.value.suburb).length < 3) {
    if (blur) interestErrors.value.suburb = 'Suburb must be at least 3 characters.'
  } else {
    interestErrors.value.suburb = null
  }
}

function validateInterestArea(blur) {
  if (!interestForm.value.interest) {
    if (blur) interestErrors.value.interest = 'Choose an interest area.'
  } else {
    interestErrors.value.interest = null
  }
}

function validateNewEvent() {
  eventErrors.value.title = sanitizeInput(newEventForm.value.title).length < 4 ? 'Event title must be at least 4 characters.' : null
  eventErrors.value.location = sanitizeInput(newEventForm.value.location).length < 3 ? 'Location must be at least 3 characters.' : null
  eventErrors.value.date = sanitizeInput(newEventForm.value.date).length < 3 ? 'Date is required.' : null
  eventErrors.value.summary = sanitizeInput(newEventForm.value.summary).length < 12 ? 'Summary must be at least 12 characters.' : null
  return !eventErrors.value.title && !eventErrors.value.location && !eventErrors.value.date && !eventErrors.value.summary
}

function openAuth(mode = 'login', target = 'home') {
  authMode.value = mode
  requestedPage.value = target
  activePage.value = 'auth'
  detailItem.value = null
  isMobileNavOpen.value = false
  authNotice.value = target === 'home' ? '' : 'Please log in or register to continue.'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPage(page) {
  isMobileNavOpen.value = false

  if (page !== 'home' && !isLoggedIn.value) {
    openAuth('login', page)
    return
  }
  activePage.value = page
  detailItem.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showDetail(type, id) {
  if (!isLoggedIn.value) {
    openAuth('login', activePage.value)
    return
  }
  detailItem.value = { type, id }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeDetail() {
  detailItem.value = null
}

function finishAuth(user) {
  currentUser.value = user
  isLoggedIn.value = true
  isMobileNavOpen.value = false
  loginForm.value.password = ''
  registerForm.value.password = ''
  authNotice.value = ''
  activePage.value = requestedPage.value === 'auth' ? 'home' : requestedPage.value
  requestedPage.value = 'home'
}

function submitLogin() {
  validateLoginEmail(true)
  validateLoginPassword(true)
  loginErrors.value.account = null
  if (loginErrors.value.email || loginErrors.value.password) return

  const email = loginForm.value.email.trim().toLowerCase()
  const user = users.value.find((item) => item.email === email && item.password === loginForm.value.password)
  if (!user) {
    loginErrors.value.account = 'Account not found. Register first or use a demo account.'
    return
  }
  finishAuth(user)
}

function submitRegister() {
  validateRegisterName(true)
  validateRegisterEmail(true)
  validateRegisterPassword(true)
  validateRegisterRole(true)
  if (registerErrors.value.name || registerErrors.value.email || registerErrors.value.password || registerErrors.value.role) return

  const user = {
    id: Date.now(),
    name: sanitizeInput(registerForm.value.name),
    email: sanitizeInput(registerForm.value.email).toLowerCase(),
    password: registerForm.value.password,
    role: registerForm.value.role,
  }
  users.value.push(user)
  registerForm.value = { name: '', email: '', password: '', role: 'resident' }
  finishAuth(user)
}

function logout() {
  isLoggedIn.value = false
  currentUser.value = null
  activePage.value = 'home'
  detailItem.value = null
  isMobileNavOpen.value = false
  loginErrors.value = { email: null, password: null, account: null }
}

function submitInterest() {
  interestSuccess.value = false
  validateInterestName(true)
  validateInterestEmail(true)
  validateSuburb(true)
  validateInterestArea(true)
  if (interestErrors.value.name || interestErrors.value.email || interestErrors.value.suburb || interestErrors.value.interest) return
  interestSuccess.value = true
  interestForm.value = { name: '', email: '', suburb: '', interest: '' }
  interestErrors.value = { name: null, email: null, suburb: null, interest: null }
}

function submitNewEvent() {
  eventSuccess.value = false
  if (!isOrganiser.value || !validateNewEvent()) return
  createdEvents.value.push({
    id: Date.now(),
    title: sanitizeInput(newEventForm.value.title),
    location: sanitizeInput(newEventForm.value.location),
    date: sanitizeInput(newEventForm.value.date),
    dateGroup: newEventForm.value.dateGroup,
    tag: newEventForm.value.tag,
    summary: sanitizeInput(newEventForm.value.summary),
    ownerId: currentUser.value.id,
  })
  newEventForm.value = { title: '', location: '', date: '', dateGroup: 'Next month', tag: 'Tree Planting', summary: '' }
  eventSuccess.value = true
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
  if (!isLoggedIn.value) {
    openAuth('login', activePage.value)
    return
  }
  const key = `${type}-${id}`
  savedItems.value = savedItems.value.includes(key)
    ? savedItems.value.filter((item) => item !== key)
    : [...savedItems.value, key]
}

function isSaved(type, id) {
  return savedItems.value.includes(`${type}-${id}`)
}

function registerEvent(id) {
  if (!isLoggedIn.value) {
    openAuth('login', 'events')
    return
  }
  if (!registeredEventIds.value.includes(id)) registeredEventIds.value.push(id)
}

function ratingKey(type, id) {
  return `${type}-${id}`
}

function setRatingInput(type, id, value) {
  ratingInputs.value[ratingKey(type, id)] = Number(value)
}

function averageRating(type, id) {
  const values = ratings.value[ratingKey(type, id)] || []
  if (values.length === 0) return 'No ratings'
  return (values.reduce((total, value) => total + value, 0) / values.length).toFixed(1)
}

function ratingCount(type, id) {
  return ratings.value[ratingKey(type, id)]?.length || 0
}

function submitRating(type, id) {
  const key = ratingKey(type, id)
  const value = ratingInputs.value[key]
  if (!value) {
    ratingMessages.value[key] = 'Choose a rating first.'
    return
  }
  ratings.value[key] = [...(ratings.value[key] || []), value]
  ratingInputs.value[key] = ''
  ratingMessages.value[key] = 'Rating saved.'
}
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isMobileNavOpen"
        aria-controls="primary-navigation"
        aria-label="Open navigation menu"
        @click="isMobileNavOpen = !isMobileNavOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <button class="brand brand-button" type="button" @click="goToPage('home')">
        <span class="brand-mark">GL</span>
        <span>GreenLink Melbourne</span>
      </button>

      <nav id="primary-navigation" class="main-nav" :class="{ open: isMobileNavOpen }" aria-label="Primary navigation">
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

      <div class="header-actions">
        <div v-if="isLoggedIn" class="user-chip">
          <strong>{{ currentUser.name }}</strong>
          <span>{{ userRoleLabel }}</span>
        </div>
        <button v-if="isLoggedIn" class="logout-button" type="button" @click="logout">Log out</button>
        <button v-else class="logout-button" type="button" @click="openAuth('login')">Log in</button>
      </div>
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
          <div v-if="detailItem.type !== 'learn'" class="rating-panel">
            <strong>Average rating: {{ averageRating(detailItem.type, detailItem.id) }} / 5</strong>
            <span>{{ ratingCount(detailItem.type, detailItem.id) }} reviews</span>
            <div class="rating-row">
              <select
                :value="ratingInputs[ratingKey(detailItem.type, detailItem.id)] || ''"
                @change="setRatingInput(detailItem.type, detailItem.id, $event.target.value)"
              >
                <option value="">Rate this</option>
                <option v-for="score in 5" :key="score" :value="score">{{ score }}</option>
              </select>
              <button type="button" @click="submitRating(detailItem.type, detailItem.id)">Submit rating</button>
            </div>
            <p v-if="ratingMessages[ratingKey(detailItem.type, detailItem.id)]" class="small-status">
              {{ ratingMessages[ratingKey(detailItem.type, detailItem.id)] }}
            </p>
          </div>
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

      <section v-else-if="activePage === 'auth'" class="login-page auth-page">
        <section class="login-card" aria-labelledby="login-heading">
          <div class="login-copy">
            <span class="brand-mark">GL</span>
            <p class="eyebrow">GreenLink Melbourne</p>
            <h1 id="login-heading">{{ authMode === 'login' ? 'Log in to continue.' : 'Create an account.' }}</h1>
            <p>Access green space tools, event registration, saved items, role-based account features, and review ratings.</p>
            <p v-if="authNotice" class="auth-notice">{{ authNotice }}</p>
          </div>

          <div>
            <div class="auth-switch" role="tablist" aria-label="Authentication mode">
              <button type="button" :class="{ active: authMode === 'login' }" @click="authMode = 'login'">Log in</button>
              <button type="button" :class="{ active: authMode === 'register' }" @click="authMode = 'register'">Register</button>
            </div>

            <form v-if="authMode === 'login'" class="interest-form" novalidate @submit.prevent="submitLogin">
              <div class="form-field">
                <label for="login-email">Email address</label>
                <input id="login-email" v-model="loginForm.email" type="email" autocomplete="email" :aria-invalid="Boolean(loginErrors.email)" @blur="() => validateLoginEmail(true)" @input="() => validateLoginEmail(false)" />
                <p v-if="loginErrors.email" class="field-error">{{ loginErrors.email }}</p>
              </div>
              <div class="form-field">
                <label for="login-password">Password</label>
                <input id="login-password" v-model="loginForm.password" type="password" autocomplete="current-password" :aria-invalid="Boolean(loginErrors.password)" @blur="() => validateLoginPassword(true)" @input="() => validateLoginPassword(false)" />
                <p v-if="loginErrors.password" class="field-error">{{ loginErrors.password }}</p>
              </div>
              <p v-if="loginErrors.account" class="field-error">{{ loginErrors.account }}</p>
              <button class="button primary form-submit" type="submit">Log in</button>
              <p class="demo-note">Demo accounts: resident@greenlink.test / Resident1, organiser@greenlink.test / Organiser1.</p>
            </form>

            <form v-else class="interest-form" novalidate @submit.prevent="submitRegister">
              <div class="form-field">
                <label for="register-name">Full name</label>
                <input id="register-name" v-model="registerForm.name" type="text" autocomplete="name" :aria-invalid="Boolean(registerErrors.name)" @blur="() => validateRegisterName(true)" @input="() => validateRegisterName(false)" />
                <p v-if="registerErrors.name" class="field-error">{{ registerErrors.name }}</p>
              </div>
              <div class="form-field">
                <label for="register-email">Email address</label>
                <input id="register-email" v-model="registerForm.email" type="email" autocomplete="email" :aria-invalid="Boolean(registerErrors.email)" @blur="() => validateRegisterEmail(true)" @input="() => validateRegisterEmail(false)" />
                <p v-if="registerErrors.email" class="field-error">{{ registerErrors.email }}</p>
              </div>
              <div class="form-field">
                <label for="register-password">Password</label>
                <input id="register-password" v-model="registerForm.password" type="password" autocomplete="new-password" :aria-invalid="Boolean(registerErrors.password)" @blur="() => validateRegisterPassword(true)" @input="() => validateRegisterPassword(false)" />
                <p v-if="registerErrors.password" class="field-error">{{ registerErrors.password }}</p>
              </div>
              <div class="form-field">
                <label for="register-role">Account role</label>
                <select id="register-role" v-model="registerForm.role" :aria-invalid="Boolean(registerErrors.role)">
                  <option value="resident">Resident</option>
                  <option value="organiser">Organiser</option>
                </select>
                <p v-if="registerErrors.role" class="field-error">{{ registerErrors.role }}</p>
              </div>
              <button class="button primary form-submit" type="submit">Create account</button>
            </form>
          </div>
        </section>
      </section>

      <template v-else>
        <section v-if="activePage === 'home'" class="hero-section">
          <div class="hero-copy">
            <p class="eyebrow">Urban greening and biodiversity</p>
            <h1>Make Melbourne greener together.</h1>
            <p class="hero-text">Explore local green spaces, discover suitable native plants, and join community activities that support tree planting and biodiversity.</p>
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
              <button v-for="type in spaceTypes" :key="type" type="button" :class="{ active: activeSpaceType === type }" @click="activeSpaceType = type">{{ type }}</button>
            </div>
            <div class="control-row">
              <span>View:</span>
              <button type="button" :class="{ active: spaceView === 'map' }" @click="spaceView = 'map'">Map View</button>
              <button type="button" :class="{ active: spaceView === 'list' }" @click="spaceView = 'list'">List View</button>
            </div>
          </div>
          <div v-if="spaceView === 'map'" class="placeholder-map">
            <span v-for="space in filteredSpaces" :key="space.id" class="map-point" :style="{ left: space.x, top: space.y }">{{ space.name }}</span>
          </div>
          <div class="action-grid" :class="{ 'list-layout': spaceView === 'list' }">
            <article v-for="space in filteredSpaces" :key="space.id" class="action-card">
              <h3>{{ space.name }}</h3>
              <p>{{ space.suburb }} - {{ space.type }}</p>
              <p>{{ space.summary }}</p>
              <p class="rating-summary">Average rating: {{ averageRating('space', space.id) }} / 5 ({{ ratingCount('space', space.id) }} reviews)</p>
              <div class="rating-row">
                <select :value="ratingInputs[ratingKey('space', space.id)] || ''" @change="setRatingInput('space', space.id, $event.target.value)">
                  <option value="">Rate</option>
                  <option v-for="score in 5" :key="score" :value="score">{{ score }}</option>
                </select>
                <button type="button" @click="submitRating('space', space.id)">Submit</button>
              </div>
              <div class="card-actions">
                <button type="button" @click="showDetail('space', space.id)">View Details</button>
                <button type="button" @click="toggleSaved('space', space.id)">{{ isSaved('space', space.id) ? 'Saved' : 'Save' }}</button>
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
              <label v-for="option in sunlightOptions" :key="option"><input v-model="selectedSunlight" type="checkbox" :value="option" />{{ option }}</label>
            </fieldset>
            <fieldset>
              <legend>Garden Type</legend>
              <label v-for="option in gardenOptions" :key="option"><input v-model="selectedGardenTypes" type="checkbox" :value="option" />{{ option }}</label>
            </fieldset>
            <fieldset>
              <legend>Plant Type</legend>
              <label v-for="option in plantOptions" :key="option"><input v-model="selectedPlantTypes" type="checkbox" :value="option" />{{ option }}</label>
            </fieldset>
            <div class="filter-actions">
              <button class="button primary" type="button" @click="findPlants">Find Plants</button>
              <button class="button secondary" type="button" @click="resetPlantFilters">Reset Filters</button>
            </div>
          </div>
          <p v-if="!hasSearchedPlants" class="empty-state">Select your preferences above and click Find Plants to see recommendations.</p>
          <p v-else-if="filteredPlants.length === 0" class="empty-state">No plants match the selected filters.</p>
          <div v-else class="action-grid">
            <article v-for="plant in filteredPlants" :key="plant.id" class="action-card">
              <h3>{{ plant.name }}</h3>
              <p>{{ plant.sunlight }} - {{ plant.garden }} - {{ plant.type }}</p>
              <p>{{ plant.summary }}</p>
              <p class="rating-summary">Average rating: {{ averageRating('plant', plant.id) }} / 5 ({{ ratingCount('plant', plant.id) }} reviews)</p>
              <div class="rating-row">
                <select :value="ratingInputs[ratingKey('plant', plant.id)] || ''" @change="setRatingInput('plant', plant.id, $event.target.value)">
                  <option value="">Rate</option>
                  <option v-for="score in 5" :key="score" :value="score">{{ score }}</option>
                </select>
                <button type="button" @click="submitRating('plant', plant.id)">Submit</button>
              </div>
              <div class="card-actions">
                <button type="button" @click="showDetail('plant', plant.id)">View Details</button>
                <button type="button" @click="toggleSaved('plant', plant.id)">{{ isSaved('plant', plant.id) ? 'Saved' : 'Save' }}</button>
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
              <label v-for="type in eventTypes" :key="type"><input v-model="selectedEventTypes" type="checkbox" :value="type" />{{ type }}</label>
            </fieldset>
          </div>
          <div class="event-list">
            <article v-for="event in filteredEvents" :key="event.id" class="event-item">
              <div>
                <span class="event-date">{{ event.date }}</span>
                <h3>{{ event.title }}</h3>
                <p>{{ event.location }}</p>
                <p>{{ event.summary }}</p>
                <p class="rating-summary">Average rating: {{ averageRating('event', event.id) }} / 5 ({{ ratingCount('event', event.id) }} reviews)</p>
              </div>
              <div class="event-actions">
                <span class="event-tag">{{ event.tag }}</span>
                <button type="button" @click="showDetail('event', event.id)">View Details</button>
                <button type="button" @click="toggleSaved('event', event.id)">{{ isSaved('event', event.id) ? 'Saved' : 'Save' }}</button>
                <button type="button" :disabled="registeredEventIds.includes(event.id)" @click="registerEvent(event.id)">{{ registeredEventIds.includes(event.id) ? 'Registered' : 'Register Interest' }}</button>
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
          <div class="account-summary">
            <article class="role-card">
              <span>Current role</span>
              <strong>{{ userRoleLabel }}</strong>
              <p v-if="isOrganiser">You can create community events and manage your submitted event list.</p>
              <p v-else>You can save items, register for events, and submit interest in local action.</p>
            </article>
            <article class="security-note">
              <strong>Security practices</strong>
              <p>Forms validate input before submission. Stored text is trimmed and angle brackets are removed to reduce XSS risk.</p>
            </article>
          </div>
          <div class="account-grid">
            <article class="action-card">
              <h3>Saved Green Spaces</h3>
              <p v-if="savedSpaces.length === 0">No saved green spaces yet.</p>
              <button v-for="space in savedSpaces" :key="space.id" type="button" @click="showDetail('space', space.id)">{{ space.name }}</button>
            </article>
            <article class="action-card">
              <h3>Saved Plants</h3>
              <p v-if="savedPlants.length === 0">No saved plants yet.</p>
              <button v-for="plant in savedPlants" :key="plant.id" type="button" @click="showDetail('plant', plant.id)">{{ plant.name }}</button>
            </article>
            <article class="action-card">
              <h3>Saved Events</h3>
              <p v-if="savedEvents.length === 0">No saved events yet.</p>
              <button v-for="event in savedEvents" :key="event.id" type="button" @click="showDetail('event', event.id)">{{ event.title }}</button>
            </article>
            <article class="action-card">
              <h3>Registered Events</h3>
              <p v-if="registeredEvents.length === 0">No event registrations yet.</p>
              <button v-for="event in registeredEvents" :key="event.id" type="button" @click="showDetail('event', event.id)">{{ event.title }}</button>
            </article>
          </div>
        </section>

        <section v-if="activePage === 'account' && isOrganiser" class="form-section">
          <div class="form-copy">
            <p class="eyebrow">Organiser tools</p>
            <h2>Create a community event.</h2>
            <p>This role-based section is only available to organiser accounts.</p>
            <p v-if="organiserEvents.length">You have created {{ organiserEvents.length }} event(s) in this session.</p>
          </div>
          <form class="interest-form" novalidate @submit.prevent="submitNewEvent">
            <div class="form-field">
              <label for="new-event-title">Event title</label>
              <input id="new-event-title" v-model="newEventForm.title" type="text" :aria-invalid="Boolean(eventErrors.title)" />
              <p v-if="eventErrors.title" class="field-error">{{ eventErrors.title }}</p>
            </div>
            <div class="form-field">
              <label for="new-event-location">Location</label>
              <input id="new-event-location" v-model="newEventForm.location" type="text" :aria-invalid="Boolean(eventErrors.location)" />
              <p v-if="eventErrors.location" class="field-error">{{ eventErrors.location }}</p>
            </div>
            <div class="form-field">
              <label for="new-event-date">Date label</label>
              <input id="new-event-date" v-model="newEventForm.date" type="text" placeholder="Sat 10 Oct" :aria-invalid="Boolean(eventErrors.date)" />
              <p v-if="eventErrors.date" class="field-error">{{ eventErrors.date }}</p>
            </div>
            <div class="form-field">
              <label for="new-event-group">Date group</label>
              <select id="new-event-group" v-model="newEventForm.dateGroup">
                <option value="This month">This month</option>
                <option value="Next month">Next month</option>
              </select>
            </div>
            <div class="form-field">
              <label for="new-event-type">Event type</label>
              <select id="new-event-type" v-model="newEventForm.tag">
                <option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <div class="form-field">
              <label for="new-event-summary">Summary</label>
              <input id="new-event-summary" v-model="newEventForm.summary" type="text" :aria-invalid="Boolean(eventErrors.summary)" />
              <p v-if="eventErrors.summary" class="field-error">{{ eventErrors.summary }}</p>
            </div>
            <button class="button primary form-submit" type="submit">Publish event</button>
            <p v-if="eventSuccess" class="form-success" role="status">Event added to the Community Events page.</p>
          </form>
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
              <input id="name" v-model="interestForm.name" type="text" autocomplete="name" :aria-invalid="Boolean(interestErrors.name)" @blur="() => validateInterestName(true)" @input="() => validateInterestName(false)" />
              <p v-if="interestErrors.name" class="field-error">{{ interestErrors.name }}</p>
            </div>
            <div class="form-field">
              <label for="email">Email address</label>
              <input id="email" v-model="interestForm.email" type="email" autocomplete="email" :aria-invalid="Boolean(interestErrors.email)" @blur="() => validateInterestEmail(true)" @input="() => validateInterestEmail(false)" />
              <p v-if="interestErrors.email" class="field-error">{{ interestErrors.email }}</p>
            </div>
            <div class="form-field">
              <label for="suburb">Suburb</label>
              <input id="suburb" v-model="interestForm.suburb" type="text" autocomplete="address-level2" :aria-invalid="Boolean(interestErrors.suburb)" @blur="() => validateSuburb(true)" @input="() => validateSuburb(false)" />
              <p v-if="interestErrors.suburb" class="field-error">{{ interestErrors.suburb }}</p>
            </div>
            <div class="form-field">
              <label for="interest">Interest area</label>
              <select id="interest" v-model="interestForm.interest" :aria-invalid="Boolean(interestErrors.interest)" @blur="() => validateInterestArea(true)" @change="() => validateInterestArea(false)">
                <option value="">Select one</option>
                <option value="tree-planting">Tree planting</option>
                <option value="native-plants">Native planting</option>
                <option value="biodiversity">Biodiversity monitoring</option>
                <option value="community-garden">Community gardening</option>
              </select>
              <p v-if="interestErrors.interest" class="field-error">{{ interestErrors.interest }}</p>
            </div>
            <button class="button primary form-submit" type="submit">Submit interest</button>
            <p v-if="interestSuccess" class="form-success" role="status">Thanks. Your volunteer interest has been recorded for this demo.</p>
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
  </div>
</template>
