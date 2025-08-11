import { createApp } from 'vue'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    // activate the new SW and reload
    updateSW(true)
  },
  onOfflineReady() {
    console.log('✅ App is ready to work offline')
  },
  onRegisteredSW(_swUrl, reg) {
    // Periodically check for new versions
    if (reg) setInterval(() => reg.update(),24* 60 * 60 * 1000) // every day
  }
})

app.mount('#app')