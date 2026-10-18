<script setup>
import { useGreenLink } from '../../composables/useGreenLink.js'

// The responsive header reflects the active route and current Firebase session.
const {
  activePage,
  currentUser,
  goToPage,
  isLoggedIn,
  isMobileNavOpen,
  logout,
  openAuth,
  pages,
  userRoleLabel,
} = useGreenLink()
</script>

<template>
  <header class="site-header">
    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="isMobileNavOpen"
      aria-controls="primary-navigation"
      aria-label="Open navigation menu"
      @click="isMobileNavOpen = !isMobileNavOpen"
    >
      <span></span><span></span><span></span>
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
</template>
