import { computed, ref } from 'vue'
import {
  eventDates,
  eventLocations,
  eventTypes,
  gardenOptions,
  greenSpaces,
  impactStats,
  initialEvents,
  learningTopics,
  nativePlants,
  pages,
  plantOptions,
  quickActions,
  spaceTypes,
  sunlightOptions,
} from '../data/catalog.js'

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
let navigate = (target) => {
  activePage.value = typeof target === 'string' ? target : target.name
}

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

const filteredEvents = computed(() => communityEvents.value.filter((event) => {
  const matchesLocation = eventLocation.value === 'All Locations' || event.location === eventLocation.value
  const matchesDate = eventDate.value === 'All Dates' || event.dateGroup === eventDate.value
  const matchesType = selectedEventTypes.value.length === 0 || selectedEventTypes.value.includes(event.tag)
  return matchesLocation && matchesDate && matchesType
}))

const savedSpaces = computed(() => greenSpaces.filter((item) => isSaved('space', item.id)))
const savedPlants = computed(() => nativePlants.filter((item) => isSaved('plant', item.id)))
const savedEvents = computed(() => communityEvents.value.filter((item) => isSaved('event', item.id)))
const registeredEvents = computed(() => communityEvents.value.filter((event) => registeredEventIds.value.includes(event.id)))
const organiserEvents = computed(() => createdEvents.value.filter((event) => event.ownerId === currentUser.value?.id))

const detailData = computed(() => {
  if (!detailItem.value) return null
  const source = { space: greenSpaces, plant: nativePlants, event: communityEvents.value, learn: learningTopics }[detailItem.value.type]
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
  } else loginErrors.value.email = null
}

function validateLoginPassword(blur) {
  const password = loginForm.value.password
  if (!password) {
    if (blur) loginErrors.value.password = 'Password is required.'
  } else if (password.length < 6) {
    if (blur) loginErrors.value.password = 'Password must be at least 6 characters.'
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    if (blur) loginErrors.value.password = 'Password must include both letters and numbers.'
  } else loginErrors.value.password = null
}

function validateRegisterName(blur) {
  if (sanitizeInput(registerForm.value.name).length < 2) {
    if (blur) registerErrors.value.name = 'Name must be at least 2 characters.'
  } else registerErrors.value.name = null
}

function validateRegisterEmail(blur) {
  const email = registerForm.value.email.trim().toLowerCase()
  if (!email) {
    if (blur) registerErrors.value.email = 'Email is required.'
  } else if (!validateEmail(email)) {
    if (blur) registerErrors.value.email = 'Enter a valid email address.'
  } else if (users.value.some((user) => user.email === email)) {
    if (blur) registerErrors.value.email = 'This email is already registered.'
  } else registerErrors.value.email = null
}

function validateRegisterPassword(blur) {
  const password = registerForm.value.password
  if (!password) {
    if (blur) registerErrors.value.password = 'Password is required.'
  } else if (!validatePasswordValue(password)) {
    if (blur) registerErrors.value.password = 'Use at least 6 characters with letters and numbers.'
  } else registerErrors.value.password = null
}

function validateRegisterRole(blur) {
  if (!['resident', 'organiser'].includes(registerForm.value.role)) {
    if (blur) registerErrors.value.role = 'Choose a valid role.'
  } else registerErrors.value.role = null
}

function validateInterestName(blur) {
  if (sanitizeInput(interestForm.value.name).length < 2) {
    if (blur) interestErrors.value.name = 'Name must be at least 2 characters.'
  } else interestErrors.value.name = null
}

function validateInterestEmail(blur) {
  const email = interestForm.value.email.trim()
  if (!email) {
    if (blur) interestErrors.value.email = 'Email is required.'
  } else if (!validateEmail(email)) {
    if (blur) interestErrors.value.email = 'Enter a valid email address.'
  } else interestErrors.value.email = null
}

function validateSuburb(blur) {
  if (sanitizeInput(interestForm.value.suburb).length < 3) {
    if (blur) interestErrors.value.suburb = 'Suburb must be at least 3 characters.'
  } else interestErrors.value.suburb = null
}

function validateInterestArea(blur) {
  if (!interestForm.value.interest) {
    if (blur) interestErrors.value.interest = 'Choose an interest area.'
  } else interestErrors.value.interest = null
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
  detailItem.value = null
  isMobileNavOpen.value = false
  authNotice.value = target === 'home' ? '' : 'Please log in or register to continue.'
  navigate('auth')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPage(page) {
  isMobileNavOpen.value = false
  if (page !== 'home' && !isLoggedIn.value) {
    openAuth('login', page)
    return
  }
  detailItem.value = null
  navigate(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showDetail(type, id) {
  if (!isLoggedIn.value) {
    openAuth('login', activePage.value)
    return
  }
  detailItem.value = { type, id }
  navigate({ name: 'detail', params: { type, id } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeDetail() {
  const parentPage = { space: 'spaces', plant: 'plants', event: 'events', learn: 'learn' }[detailItem.value?.type] || 'home'
  detailItem.value = null
  navigate(parentPage)
}

function finishAuth(user) {
  currentUser.value = user
  isLoggedIn.value = true
  isMobileNavOpen.value = false
  loginForm.value.password = ''
  registerForm.value.password = ''
  authNotice.value = ''
  const destination = requestedPage.value === 'auth' ? 'home' : requestedPage.value
  requestedPage.value = 'home'
  navigate(destination)
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
  detailItem.value = null
  isMobileNavOpen.value = false
  loginErrors.value = { email: null, password: null, account: null }
  navigate('home')
}

function configureNavigation(handler) {
  navigate = handler
}

function syncRoute(page) {
  activePage.value = page
}

function setAuthRedirect(destination) {
  requestedPage.value = destination
  authMode.value = 'login'
  authNotice.value = 'Please log in or register to continue.'
}

function setDetailFromRoute(type, id) {
  const numericId = Number(id)
  detailItem.value = { type, id: Number.isNaN(numericId) ? id : numericId }
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

const store = {
  pages, greenSpaces, nativePlants, learningTopics, impactStats, quickActions,
  spaceTypes, sunlightOptions, gardenOptions, plantOptions, eventTypes, eventLocations, eventDates,
  loginForm, registerForm, interestForm, newEventForm,
  loginErrors, registerErrors, interestErrors, eventErrors,
  isLoggedIn, currentUser, activePage, requestedPage, authMode, authNotice, isMobileNavOpen, detailItem,
  interestSuccess, eventSuccess, searchInput, activeSpaceType, spaceView,
  selectedSunlight, selectedGardenTypes, selectedPlantTypes, hasSearchedPlants,
  eventLocation, eventDate, selectedEventTypes, registeredEventIds, ratingInputs, ratingMessages,
  communityEvents, isOrganiser, userRoleLabel, filteredSpaces, filteredPlants, filteredEvents,
  savedSpaces, savedPlants, savedEvents, registeredEvents, organiserEvents, detailData,
  validateLoginEmail, validateLoginPassword, validateRegisterName, validateRegisterEmail,
  validateRegisterPassword, validateRegisterRole, validateInterestName, validateInterestEmail,
  validateSuburb, validateInterestArea, openAuth, goToPage, showDetail, closeDetail,
  submitLogin, submitRegister, logout, submitInterest, submitNewEvent, findPlants,
  resetPlantFilters, toggleSaved, isSaved, registerEvent, ratingKey, setRatingInput,
  averageRating, ratingCount, submitRating, configureNavigation, syncRoute,
  setAuthRedirect, setDetailFromRoute,
}

export function useGreenLink() {
  return store
}
