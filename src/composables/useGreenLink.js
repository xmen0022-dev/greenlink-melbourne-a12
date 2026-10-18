import { computed, ref } from 'vue'
import {
  eventDates,
  eventLocations,
  eventTypes,
  gardenOptions,
  greenSpaces as fallbackGreenSpaces,
  impactStats,
  initialEvents as fallbackEvents,
  learningTopics as fallbackLearningTopics,
  nativePlants as fallbackNativePlants,
  pages,
  plantOptions,
  quickActions,
  spaceTypes,
  sunlightOptions,
} from '../data/catalog.js'

// Catalog state starts with bundled data, then replaces each non-empty section
// with its live Firestore equivalent when available.
const greenSpaces = ref([...fallbackGreenSpaces])
const nativePlants = ref([...fallbackNativePlants])
const learningTopics = ref([...fallbackLearningTopics])
const initialEvents = ref([...fallbackEvents])
const catalogLoading = ref(false)
const catalogError = ref('')

// Form values and validation messages are kept centrally so related views share
// the same behaviour and can retain useful input during navigation.
const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ name: '', email: '', password: '', role: 'resident' })
const interestForm = ref({ name: '', email: '', suburb: '', interest: '' })
const newEventForm = ref({ title: '', location: '', date: '', dateGroup: 'Next month', tag: 'Tree Planting', summary: '' })

const loginErrors = ref({ email: null, password: null, account: null })
const registerErrors = ref({ name: null, email: null, password: null, role: null })
const interestErrors = ref({ name: null, email: null, suburb: null, interest: null })
const eventErrors = ref({ title: null, location: null, date: null, summary: null })

// Session, navigation, filter, and user activity state used across the app.
const isLoggedIn = ref(false)
const currentUser = ref(null)
const activePage = ref('home')
const requestedPage = ref('home')
const authMode = ref('login')
const authNotice = ref('')
const authReady = ref(false)
const authSubmitting = ref(false)
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
const baselineRatings = {
  'space-1': [5, 4],
  'space-2': [4],
  'plant-101': [5],
  'event-201': [4, 5],
}
const ratings = ref({ ...baselineRatings })
const userRatings = ref({})
const ratingInputs = ref({})
const ratingMessages = ref({})
const activityLoading = ref(false)
const activityError = ref('')
const registrationMessages = ref({})
const interestEmailStatus = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let navigate = (target) => {
  // This fallback supports isolated component use before the router is attached.
  activePage.value = typeof target === 'string' ? target : target.name
}

// Derived collections update automatically whenever a catalog or filter changes.
const communityEvents = computed(() => [...initialEvents.value, ...createdEvents.value])
const isOrganiser = computed(() => currentUser.value?.role === 'organiser')
const userRoleLabel = computed(() => (currentUser.value?.role === 'organiser' ? 'Organiser' : 'Resident'))

const filteredSpaces = computed(() => {
  const search = searchInput.value.trim().toLowerCase()
  return greenSpaces.value.filter((space) => {
    const matchesType = activeSpaceType.value === 'All' || space.type === activeSpaceType.value
    const matchesSearch = !search || space.name.toLowerCase().includes(search) || space.suburb.toLowerCase().includes(search)
    return matchesType && matchesSearch
  })
})

const filteredPlants = computed(() => {
  if (!hasSearchedPlants.value) return []
  return nativePlants.value.filter((plant) => {
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

const savedSpaces = computed(() => greenSpaces.value.filter((item) => isSaved('space', item.id)))
const savedPlants = computed(() => nativePlants.value.filter((item) => isSaved('plant', item.id)))
const savedEvents = computed(() => communityEvents.value.filter((item) => isSaved('event', item.id)))
const registeredEvents = computed(() => communityEvents.value.filter((event) => registeredEventIds.value.includes(event.id)))
const organiserEvents = computed(() => communityEvents.value.filter((event) => event.ownerId === currentUser.value?.id))

const detailData = computed(() => {
  if (!detailItem.value) return null
  const source = {
    space: greenSpaces.value,
    plant: nativePlants.value,
    event: communityEvents.value,
    learn: learningTopics.value,
  }[detailItem.value.type]
  return source.find((item) => item.id === detailItem.value.id)
})

async function loadCatalogs() {
  catalogLoading.value = true
  catalogError.value = ''

  try {
    const { fetchCatalogs } = await import('../services/catalogService.js')
    const catalogs = await fetchCatalogs()

    // Keep the bundled section when a live collection is empty.
    if (catalogs.spaces.length) greenSpaces.value = catalogs.spaces
    if (catalogs.plants.length) nativePlants.value = catalogs.plants
    if (catalogs.events.length) initialEvents.value = catalogs.events
    if (catalogs.learningTopics.length) learningTopics.value = catalogs.learningTopics
  } catch (error) {
    catalogError.value = 'Live catalog data is unavailable. Showing the built-in catalog.'
    console.warn('GreenLink catalog fallback is active.', error)
  } finally {
    catalogLoading.value = false
  }
}

function resetUserActivity() {
  savedItems.value = []
  registeredEventIds.value = []
  ratings.value = { ...baselineRatings }
  userRatings.value = {}
  ratingInputs.value = {}
  ratingMessages.value = {}
  activityError.value = ''
  registrationMessages.value = {}
  interestEmailStatus.value = ''
}

async function sendAccountEmail(payload) {
  // Email support is loaded only when it is needed, reducing the initial bundle.
  const { sendConfirmationEmail } = await import('../services/emailService.js')
  return sendConfirmationEmail(payload)
}

function describeEmailError(error) {
  const status = Number(error?.status)
  const rawMessage = error?.text || error?.message || 'Unknown EmailJS error.'
  // Keep diagnostics useful without allowing multiline or oversized provider
  // responses to disrupt the page layout.
  const safeMessage = String(rawMessage)
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)

  return `${Number.isFinite(status) ? `EmailJS ${status}: ` : ''}${safeMessage}`
}

async function restoreUserActivity(userId) {
  activityLoading.value = true
  activityError.value = ''
  try {
    const { loadUserActivity } = await import('../services/activityService.js')
    const activity = await loadUserActivity(userId)
    savedItems.value = activity.savedItems.map((item) => `${item.itemType}-${item.itemId}`)
    registeredEventIds.value = activity.registrations.map((item) => item.eventId)
    ratings.value = { ...baselineRatings }
    userRatings.value = {}
    // Merge the user's rating into the bundled aggregate used by the demo UI.
    for (const rating of activity.userRatings) {
      const key = `${rating.itemType}-${rating.itemId}`
      ratings.value[key] = [...(ratings.value[key] || []), rating.value]
      userRatings.value[key] = rating.value
    }
  } catch (error) {
    activityError.value = 'Your saved activity could not be loaded. Please refresh and try again.'
    console.warn('GreenLink activity restoration failed.', error)
  } finally {
    activityLoading.value = false
  }
}

function sanitizeInput(value) {
  // Trim simple text fields and remove angle brackets before persistence.
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

function finishAuth(user, shouldRedirect = true) {
  currentUser.value = user
  isLoggedIn.value = Boolean(user)
  if (!user || !shouldRedirect) return
  isMobileNavOpen.value = false
  loginForm.value.password = ''
  registerForm.value.password = ''
  authNotice.value = ''
  // Continue to the protected page that originally initiated authentication.
  const destination = requestedPage.value === 'auth' ? 'home' : requestedPage.value
  requestedPage.value = 'home'
  navigate(destination)
}

function authenticationMessage(error, fallback) {
  return {
    'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/network-request-failed': 'Unable to reach Firebase. Check your connection and try again.',
    'auth/operation-not-allowed': 'Email/password sign-in has not been enabled for this Firebase project.',
    'auth/too-many-requests': 'Too many attempts. Please wait before trying again.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/weak-password': 'Use a stronger password with at least 6 characters.',
  }[error?.code] || fallback
}

async function submitLogin() {
  validateLoginEmail(true)
  validateLoginPassword(true)
  loginErrors.value.account = null
  if (loginErrors.value.email || loginErrors.value.password) return

  authSubmitting.value = true
  try {
    const { loginWithEmail } = await import('../services/authService.js')
    const user = await loginWithEmail(loginForm.value.email.trim().toLowerCase(), loginForm.value.password)
    finishAuth(user)
  } catch (error) {
    loginErrors.value.account = authenticationMessage(error, 'Unable to log in. Please try again.')
  } finally {
    authSubmitting.value = false
  }
}

async function submitRegister() {
  validateRegisterName(true)
  validateRegisterEmail(true)
  validateRegisterPassword(true)
  registerErrors.value.role = null
  if (registerErrors.value.name || registerErrors.value.email || registerErrors.value.password) return

  authSubmitting.value = true
  try {
    const { registerResident } = await import('../services/authService.js')
    const user = await registerResident({
      name: sanitizeInput(registerForm.value.name),
      email: sanitizeInput(registerForm.value.email).toLowerCase(),
      password: registerForm.value.password,
    })
    registerForm.value = { name: '', email: '', password: '', role: 'resident' }
    finishAuth(user)
  } catch (error) {
    registerErrors.value.email = authenticationMessage(error, 'Unable to create the account. Please try again.')
  } finally {
    authSubmitting.value = false
  }
}

async function logout() {
  const { logoutFromFirebase } = await import('../services/authService.js')
  await logoutFromFirebase().catch(() => {})
  isLoggedIn.value = false
  currentUser.value = null
  detailItem.value = null
  isMobileNavOpen.value = false
  loginErrors.value = { email: null, password: null, account: null }
  navigate('home')
}

let authInitialisation

function initializeAuth() {
  // Reuse one promise so multiple route guards cannot register duplicate auth
  // observers while Firebase is resolving the initial session.
  if (authInitialisation) return authInitialisation

  authInitialisation = import('../services/authService.js')
    .then(({ observeAuthentication }) => new Promise((resolve) => {
      let initialStateHandled = false
      observeAuthentication((user, error) => {
        finishAuth(user, false)
        if (user) {
          void restoreUserActivity(user.id)
          if (!interestForm.value.name) interestForm.value.name = user.name
          if (!interestForm.value.email) interestForm.value.email = user.email
        } else resetUserActivity()
        if (error) authNotice.value = authenticationMessage(error, 'Unable to restore your session.')
        authReady.value = true
        if (!initialStateHandled) {
          initialStateHandled = true
          resolve()
        }
      })
    }))
    .catch((error) => {
      authNotice.value = authenticationMessage(error, 'Unable to initialise authentication.')
      authReady.value = true
    })

  return authInitialisation
}

function waitForAuthReady() {
  return initializeAuth()
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

async function submitInterest() {
  interestSuccess.value = false
  interestEmailStatus.value = ''
  validateInterestName(true)
  validateInterestEmail(true)
  validateSuburb(true)
  validateInterestArea(true)
  if (interestErrors.value.name || interestErrors.value.email || interestErrors.value.suburb || interestErrors.value.interest) return
  try {
    const { saveVolunteerInterest } = await import('../services/activityService.js')
    const interest = {
      name: sanitizeInput(interestForm.value.name),
      email: sanitizeInput(interestForm.value.email).toLowerCase(),
      suburb: sanitizeInput(interestForm.value.suburb),
      interest: interestForm.value.interest,
    }
    await saveVolunteerInterest(currentUser.value.id, interest)
    interestSuccess.value = true
    interestForm.value = { name: currentUser.value.name, email: currentUser.value.email, suburb: '', interest: '' }
    interestErrors.value = { name: null, email: null, suburb: null, interest: null }

    // Email is a follow-up side effect. Its failure must not undo the interest
    // record that has already been saved successfully.
    try {
      await sendAccountEmail({
        toName: interest.name,
        toEmail: interest.email,
        subject: 'GreenLink volunteer interest received',
        heading: 'Thanks for volunteering with GreenLink Melbourne.',
        message: `We recorded your interest in ${interest.interest.replaceAll('-', ' ')} activities near ${interest.suburb}.`,
      })
      interestEmailStatus.value = 'A confirmation email has been sent.'
    } catch (error) {
      const reason = describeEmailError(error)
      console.error('EmailJS volunteer confirmation failed:', reason)
      interestEmailStatus.value = `Your interest was saved, but the confirmation email failed. ${reason}`
    }
  } catch (error) {
    interestErrors.value.interest = 'Unable to save your interest. Please try again.'
  }
}

async function submitNewEvent() {
  eventSuccess.value = false
  if (!isOrganiser.value || !validateNewEvent()) return
  try {
    const { publishEvent } = await import('../services/activityService.js')
    const event = await publishEvent(currentUser.value.id, {
      title: sanitizeInput(newEventForm.value.title),
      location: sanitizeInput(newEventForm.value.location),
      date: sanitizeInput(newEventForm.value.date),
      dateGroup: newEventForm.value.dateGroup,
      tag: newEventForm.value.tag,
      summary: sanitizeInput(newEventForm.value.summary),
    })
    createdEvents.value.push(event)
    newEventForm.value = { title: '', location: '', date: '', dateGroup: 'Next month', tag: 'Tree Planting', summary: '' }
    eventSuccess.value = true
  } catch (error) {
    eventErrors.value.summary = 'Unable to publish this event. Please try again.'
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

async function toggleSaved(type, id) {
  if (!isLoggedIn.value) {
    openAuth('login', activePage.value)
    return
  }
  const key = `${type}-${id}`
  const shouldSave = !savedItems.value.includes(key)
  try {
    const { setSavedItem } = await import('../services/activityService.js')
    await setSavedItem(currentUser.value.id, type, id, shouldSave)
    // Update local state only after Firestore confirms the write.
    savedItems.value = shouldSave
      ? [...savedItems.value, key]
      : savedItems.value.filter((item) => item !== key)
    activityError.value = ''
  } catch (error) {
    activityError.value = 'Unable to update your saved items. Please try again.'
  }
}

function isSaved(type, id) {
  return savedItems.value.includes(`${type}-${id}`)
}

async function registerEvent(id) {
  if (!isLoggedIn.value) {
    openAuth('login', 'events')
    return
  }
  if (registeredEventIds.value.includes(id)) return
  try {
    const { saveRegistration } = await import('../services/activityService.js')
    // The Cloud Function performs the authoritative, duplicate-safe write.
    await saveRegistration(currentUser.value.id, id)
    registeredEventIds.value.push(id)
    activityError.value = ''
    registrationMessages.value[id] = 'Registration saved. Sending confirmation email…'

    const event = communityEvents.value.find((item) => item.id === id)
    // As with volunteer interests, email failure does not roll back registration.
    try {
      await sendAccountEmail({
        toName: currentUser.value.name,
        toEmail: currentUser.value.email,
        subject: `GreenLink registration: ${event?.title || 'Community event'}`,
        heading: `You are registered for ${event?.title || 'a GreenLink community event'}.`,
        message: `${event?.date || 'Date to be confirmed'} at ${event?.location || 'a location to be confirmed'}.`,
      })
      registrationMessages.value[id] = 'Registered. A confirmation email has been sent.'
    } catch (error) {
      const reason = describeEmailError(error)
      console.error('EmailJS event confirmation failed:', reason)
      registrationMessages.value[id] = `Registered successfully, but the confirmation email failed. ${reason}`
    }
  } catch (error) {
    activityError.value = 'Unable to register for this event. Please try again.'
    registrationMessages.value[id] = 'Registration could not be saved. Please try again.'
  }
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

async function submitRating(type, id) {
  const key = ratingKey(type, id)
  const value = ratingInputs.value[key]
  if (!value) {
    ratingMessages.value[key] = 'Choose a rating first.'
    return
  }
  try {
    const { saveRating } = await import('../services/activityService.js')
    await saveRating(currentUser.value.id, type, id, value)
    const values = [...(ratings.value[key] || [])]
    // Replace the user's previous contribution so editing a rating does not
    // inflate the displayed count or average.
    const previousValue = userRatings.value[key]
    const previousIndex = previousValue === undefined ? -1 : values.lastIndexOf(previousValue)
    if (previousIndex >= 0) values.splice(previousIndex, 1)
    ratings.value[key] = [...values, value]
    userRatings.value[key] = value
    ratingInputs.value[key] = ''
    ratingMessages.value[key] = 'Rating saved to your account.'
  } catch (error) {
    ratingMessages.value[key] = 'Unable to save your rating. Please try again.'
  }
}

// This singleton store provides lightweight shared state without an additional
// state-management dependency.
const store = {
  pages, greenSpaces, nativePlants, learningTopics, impactStats, quickActions,
  catalogLoading, catalogError,
  activityLoading, activityError,
  registrationMessages, interestEmailStatus,
  spaceTypes, sunlightOptions, gardenOptions, plantOptions, eventTypes, eventLocations, eventDates,
  loginForm, registerForm, interestForm, newEventForm,
  loginErrors, registerErrors, interestErrors, eventErrors,
  isLoggedIn, currentUser, activePage, requestedPage, authMode, authNotice, authReady, authSubmitting,
  isMobileNavOpen, detailItem,
  interestSuccess, eventSuccess, searchInput, activeSpaceType, spaceView,
  selectedSunlight, selectedGardenTypes, selectedPlantTypes, hasSearchedPlants,
  eventLocation, eventDate, selectedEventTypes, registeredEventIds, ratingInputs, ratingMessages,
  communityEvents, isOrganiser, userRoleLabel, filteredSpaces, filteredPlants, filteredEvents,
  savedSpaces, savedPlants, savedEvents, registeredEvents, organiserEvents, detailData,
  validateLoginEmail, validateLoginPassword, validateRegisterName, validateRegisterEmail,
  validateRegisterPassword, validateInterestName, validateInterestEmail,
  validateSuburb, validateInterestArea, openAuth, goToPage, showDetail, closeDetail,
  submitLogin, submitRegister, logout, submitInterest, submitNewEvent, findPlants,
  resetPlantFilters, toggleSaved, isSaved, registerEvent, ratingKey, setRatingInput,
  averageRating, ratingCount, submitRating, configureNavigation, syncRoute,
  setAuthRedirect, setDetailFromRoute, loadCatalogs, initializeAuth, waitForAuthReady,
}

export function useGreenLink() {
  return store
}
