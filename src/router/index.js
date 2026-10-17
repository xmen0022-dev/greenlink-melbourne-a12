import { createRouter, createWebHistory } from 'vue-router'
import { useGreenLink } from '../composables/useGreenLink.js'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { navKey: 'home' } },
  { path: '/login', name: 'auth', component: () => import('../views/AuthView.vue'), meta: { navKey: 'auth', guestOnly: true } },
  { path: '/green-spaces', name: 'spaces', component: () => import('../views/GreenSpacesView.vue'), meta: { navKey: 'spaces', requiresAuth: true } },
  { path: '/plants', name: 'plants', component: () => import('../views/PlantFinderView.vue'), meta: { navKey: 'plants', requiresAuth: true } },
  { path: '/events', name: 'events', component: () => import('../views/EventsView.vue'), meta: { navKey: 'events', requiresAuth: true } },
  { path: '/learn', name: 'learn', component: () => import('../views/LearnView.vue'), meta: { navKey: 'learn', requiresAuth: true } },
  { path: '/account', name: 'account', component: () => import('../views/AccountView.vue'), meta: { navKey: 'account', requiresAuth: true } },
  {
    path: '/account/events/new',
    name: 'organiser-events',
    component: () => import('../views/OrganiserEventsView.vue'),
    meta: { navKey: 'account', requiresAuth: true, requiresOrganiser: true },
  },
  {
    path: '/details/:type(space|plant|event|learn)/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { navKey: '' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

const store = useGreenLink()

store.configureNavigation((target) => {
  if (typeof target === 'string') {
    return target.startsWith('/') ? router.push(target) : router.push({ name: target })
  }
  return router.push(target)
})

router.beforeEach(async (to) => {
  await store.waitForAuthReady()

  if (to.meta.requiresAuth && !store.isLoggedIn.value) {
    store.setAuthRedirect(to.fullPath)
    return { name: 'auth', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresOrganiser && !store.isOrganiser.value) {
    return { name: 'account', query: { access: 'organiser' } }
  }

  if (to.meta.guestOnly && store.isLoggedIn.value) return { name: 'home' }
  return true
})

router.afterEach((to) => {
  if (to.name === 'detail') {
    const detailNav = { space: 'spaces', plant: 'plants', event: 'events', learn: 'learn' }
    store.syncRoute(detailNav[to.params.type] || '')
    return
  }
  store.syncRoute(to.meta.navKey || '')
})

export default router
