import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { useGreenLink } from './composables/useGreenLink.js'

const store = useGreenLink()
await store.initializeAuth()
createApp(App).use(router).mount('#app')
void store.loadCatalogs()
