import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AuthService } from './services/auth.service'

const token = localStorage.getItem('token')
if (token) {
  AuthService.setAuthHeader(token)
}

const app = createApp(App)
app.use(router)
app.mount('#app')