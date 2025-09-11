import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { AuthService } from './services/auth.service'

const token = localStorage.getItem('token')
if (token) {
  AuthService.setAuthHeader(token)
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
