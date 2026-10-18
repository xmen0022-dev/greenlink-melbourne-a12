import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { useGreenLink } from './composables/useGreenLink.js'

const store = useGreenLink()

// Resolve the initial Firebase session before mounting so route guards do not
// briefly treat a returning user as signed out.
await store.initializeAuth()
createApp(App).use(router).mount('#app')

// Catalog loading is intentionally non-blocking because the store can display
// bundled fallback data while Firestore is unavailable or still loading.
void store.loadCatalogs()
