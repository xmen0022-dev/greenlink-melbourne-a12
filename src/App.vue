<script setup>
import { computed, reactive, ref } from 'vue'

const pages = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
]

const quickActions = [
  {
    title: 'Find local projects',
    text: 'Browse tree planting, clean-up days, repair cafes, and food rescue shifts across Melbourne.',
    cta: 'Explore activities',
    page: 'events',
  },
  {
    title: 'Join as a volunteer',
    text: 'Create a simple profile, choose your interests, and get matched with causes near you.',
    cta: 'Start volunteering',
    page: 'volunteer',
  },
  {
    title: 'List an opportunity',
    text: 'Community groups can publish upcoming events, capacity needs, and practical requirements.',
    cta: 'Post an event',
    page: 'contact',
  },
]

const impactStats = [
  { value: '48', label: 'active groups' },
  { value: '1,280+', label: 'volunteer hours' },
  { value: '22', label: 'suburbs covered' },
]

const upcomingEvents = [
  {
    date: 'Sat 29 Aug',
    title: 'Merri Creek clean-up',
    location: 'Brunswick East',
    tag: 'Waterways',
  },
  {
    date: 'Sun 6 Sep',
    title: 'Community garden working bee',
    location: 'North Melbourne',
    tag: 'Gardening',
  },
  {
    date: 'Tue 15 Sep',
    title: 'Food rescue packing shift',
    location: 'Footscray',
    tag: 'Food relief',
  },
]

const loginForm = reactive({
  email: '',
  password: '',
})

const loginTouched = reactive({
  email: false,
  password: false,
})

const interestForm = reactive({
  name: '',
  email: '',
  suburb: '',
  interest: '',
})

const isLoggedIn = ref(false)
const activePage = ref('home')
const loginSubmitted = ref(false)
const interestSubmitted = ref(false)
const interestSuccess = ref(false)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const loginErrors = computed(() => {
  const errors = {}

  if (!loginForm.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(loginForm.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!loginForm.password) {
    errors.password = 'Password is required.'
  } else if (loginForm.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return errors
})

const formErrors = computed(() => {
  const errors = {}

  if (!interestForm.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!interestForm.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(interestForm.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!interestForm.suburb.trim()) {
    errors.suburb = 'Suburb is required.'
  } else if (interestForm.suburb.trim().length < 3) {
    errors.suburb = 'Suburb must be at least 3 characters.'
  }

  if (!interestForm.interest) {
    errors.interest = 'Choose an interest area.'
  }

  return errors
})

const hasLoginErrors = computed(() => Object.keys(loginErrors.value).length > 0)
const hasInterestErrors = computed(() => Object.keys(formErrors.value).length > 0)

function showLoginError(field) {
  return (loginSubmitted.value || loginTouched[field]) && Boolean(loginErrors.value[field])
}

function goToPage(page) {
  activePage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function submitLogin() {
  loginSubmitted.value = true

  if (hasLoginErrors.value) {
    return
  }

  isLoggedIn.value = true
  activePage.value = 'home'
}

function logout() {
  isLoggedIn.value = false
  activePage.value = 'home'
  loginForm.password = ''
  loginSubmitted.value = false
  loginTouched.email = false
  loginTouched.password = false
}

function submitInterest() {
  interestSubmitted.value = true
  interestSuccess.value = false

  if (hasInterestErrors.value) {
    return
  }

  interestSuccess.value = true
  interestForm.name = ''
  interestForm.email = ''
  interestForm.suburb = ''
  interestForm.interest = ''
  interestSubmitted.value = false
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
          <p>
            Access local sustainability projects, volunteer registrations, and
            upcoming Melbourne events.
          </p>
        </div>

        <form class="interest-form" novalidate @submit.prevent="submitLogin">
          <div class="form-field">
            <label for="login-email">Email address</label>
            <input
              id="login-email"
              v-model="loginForm.email"
              type="email"
              autocomplete="email"
              :aria-invalid="showLoginError('email')"
              aria-describedby="login-email-error"
              @blur="loginTouched.email = true"
            />
            <p
              v-if="showLoginError('email')"
              id="login-email-error"
              class="field-error"
            >
              {{ loginErrors.email }}
            </p>
          </div>

          <div class="form-field">
            <label for="login-password">Password</label>
            <input
              id="login-password"
              v-model="loginForm.password"
              type="password"
              autocomplete="current-password"
              :aria-invalid="showLoginError('password')"
              aria-describedby="login-password-error"
              @blur="loginTouched.password = true"
            />
            <p
              v-if="showLoginError('password')"
              id="login-password-error"
              class="field-error"
            >
              {{ loginErrors.password }}
            </p>
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
        <section v-if="activePage === 'home'" class="hero-section">
          <div class="hero-copy">
            <p class="eyebrow">Community climate action</p>
            <h1>Connect with practical sustainability projects around Melbourne.</h1>
            <p class="hero-text">
              GreenLink Melbourne helps residents find local environmental
              volunteering, and helps community organisations reach people who
              want to contribute.
            </p>

            <div class="hero-actions" aria-label="Primary actions">
              <button class="button primary" type="button" @click="goToPage('projects')">
                Find a project
              </button>
              <button class="button secondary" type="button" @click="goToPage('volunteer')">
                Register interest
              </button>
            </div>
          </div>

          <div class="hero-panel" aria-label="Current GreenLink snapshot">
            <div class="map-card">
              <div class="map-header">
                <span>Melbourne network</span>
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
              <strong>Next intake</strong>
              <span>New volunteer matches open every Friday.</span>
            </div>
          </div>
        </section>

        <section v-if="activePage === 'home'" class="stats-strip" aria-label="GreenLink impact">
          <div v-for="stat in impactStats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </section>

        <section v-if="activePage === 'projects'" class="content-section page-section">
          <div class="section-heading">
            <p class="eyebrow">Choose your pathway</p>
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

        <section v-if="activePage === 'volunteer'" class="split-section page-section">
          <div>
            <p class="eyebrow">How it works</p>
            <h2>Simple steps for residents and local groups.</h2>
            <p>
              The platform is designed for fast discovery: residents filter by
              suburb, cause, date, and accessibility needs; organisations can
              publish clear event details without a complex setup process.
            </p>
          </div>

          <ol class="steps-list">
            <li>
              <span>01</span>
              <div>
                <h3>Pick your interests</h3>
                <p>Tell GreenLink whether you prefer gardens, waterways, recycling, food relief, or education.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Review matched activities</h3>
                <p>Compare upcoming opportunities by distance, time commitment, and skills needed.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Confirm attendance</h3>
                <p>Reserve a place and receive the organiser's instructions before the event.</p>
              </div>
            </li>
          </ol>
        </section>

        <section v-if="activePage === 'volunteer'" class="form-section">
          <div class="form-copy">
            <p class="eyebrow">Register interest</p>
            <h2>Tell us what kind of local action suits you.</h2>
            <p>
              This demo form validates user input before accepting a volunteer
              interest request.
            </p>
          </div>

          <form class="interest-form" novalidate @submit.prevent="submitInterest">
            <div class="form-field">
              <label for="name">Full name</label>
              <input
                id="name"
                v-model="interestForm.name"
                type="text"
                autocomplete="name"
                :aria-invalid="interestSubmitted && Boolean(formErrors.name)"
                aria-describedby="name-error"
              />
              <p v-if="interestSubmitted && formErrors.name" id="name-error" class="field-error">
                {{ formErrors.name }}
              </p>
            </div>

            <div class="form-field">
              <label for="email">Email address</label>
              <input
                id="email"
                v-model="interestForm.email"
                type="email"
                autocomplete="email"
                :aria-invalid="interestSubmitted && Boolean(formErrors.email)"
                aria-describedby="email-error"
              />
              <p v-if="interestSubmitted && formErrors.email" id="email-error" class="field-error">
                {{ formErrors.email }}
              </p>
            </div>

            <div class="form-field">
              <label for="suburb">Suburb</label>
              <input
                id="suburb"
                v-model="interestForm.suburb"
                type="text"
                autocomplete="address-level2"
                :aria-invalid="interestSubmitted && Boolean(formErrors.suburb)"
                aria-describedby="suburb-error"
              />
              <p v-if="interestSubmitted && formErrors.suburb" id="suburb-error" class="field-error">
                {{ formErrors.suburb }}
              </p>
            </div>

            <div class="form-field">
              <label for="interest">Interest area</label>
              <select
                id="interest"
                v-model="interestForm.interest"
                :aria-invalid="interestSubmitted && Boolean(formErrors.interest)"
                aria-describedby="interest-error"
              >
                <option value="">Select one</option>
                <option value="gardening">Community gardening</option>
                <option value="waterways">Waterway clean-up</option>
                <option value="food">Food rescue</option>
                <option value="repair">Repair and reuse</option>
              </select>
              <p v-if="interestSubmitted && formErrors.interest" id="interest-error" class="field-error">
                {{ formErrors.interest }}
              </p>
            </div>

            <button class="button primary form-submit" type="submit">Submit interest</button>

            <p v-if="interestSuccess" class="form-success" role="status">
              Thanks. Your volunteer interest has been recorded for this demo.
            </p>
          </form>
        </section>

        <section v-if="activePage === 'events'" class="content-section events-section page-section">
          <div class="section-heading">
            <p class="eyebrow">Upcoming opportunities</p>
            <h2>Start with a nearby event.</h2>
          </div>

          <div class="event-list">
            <article v-for="event in upcomingEvents" :key="event.title" class="event-item">
              <div>
                <span class="event-date">{{ event.date }}</span>
                <h3>{{ event.title }}</h3>
                <p>{{ event.location }}</p>
              </div>
              <span class="event-tag">{{ event.tag }}</span>
            </article>
          </div>
        </section>

        <section v-if="activePage === 'contact'" class="content-section contact-section page-section">
          <div class="section-heading">
            <p class="eyebrow">Contact</p>
            <h2>Partner with GreenLink Melbourne.</h2>
          </div>

          <div class="contact-grid">
            <article class="action-card">
              <h3>For community groups</h3>
              <p>Share upcoming events, volunteer capacity, accessibility notes, and equipment requirements.</p>
              <a href="mailto:partners@greenlinkmelbourne.org">partners@greenlinkmelbourne.org</a>
            </article>
            <article class="action-card">
              <h3>For residents</h3>
              <p>Ask questions about joining projects, registering interest, or finding accessible opportunities.</p>
              <a href="mailto:hello@greenlinkmelbourne.org">hello@greenlinkmelbourne.org</a>
            </article>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div>
          <strong>GreenLink Melbourne</strong>
          <p>Building stronger links between residents, community groups, and local sustainability work.</p>
        </div>
        <button type="button" @click="goToPage('contact')">Contact us</button>
      </footer>
    </template>
  </div>
</template>
