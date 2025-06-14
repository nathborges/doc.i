import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MaterialIcon } from './plugins/material-icons'

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', MaterialIcon) // Mantém o nome do componente para compatibilidade
app.mount('#app')