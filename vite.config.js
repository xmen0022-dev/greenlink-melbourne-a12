import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Enable Vue single-file component compilation for development and production.
export default defineConfig({
  plugins: [vue()],
})
