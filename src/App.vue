<!-- src/App.vue -->
<template>
  <div>
    <RouterView />
    <Notification 
      v-if="notification.show" 
      :message="notification.message" 
      :type="notification.type" 
      :duration="notification.duration"
      @close="closeNotification"
      :autoClose="false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue'

const notification = ref({
  show: false,
  message: '',
  type: 'info',
  duration: 3000
})

const showNotification = (message, type = 'info', duration = 3000) => {
  notification.value = {
    show: true,
    message,
    type,
    duration
  }
}

const closeNotification = () => {
  notification.value.show = false
}

// Disponibiliza a função para todos os componentes filhos
provide('showNotification', showNotification)
</script>
