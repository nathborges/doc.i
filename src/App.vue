<!-- src/App.vue -->
<template>
  <div>
    <RouterView />
    <Notification 
      v-if="notifications.length > 0" 
      :notifications="notifications" 
      @close="() => closeNotification(index)"
      :autoClose="false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue'

const notifications = ref([])

const showNotification = (fileName, type = 'info', duration = 3000) => {
  notifications.value.push({
    fileName,
    status: 'success',
    duration
  })
}

const closeNotification = (index) => {
  // Se um índice específico for fornecido, remove apenas essa notificação
  if (index !== undefined) {
    notifications.value.splice(index, 1);
  } else {
    // Caso contrário, limpa todas as notificações
    notifications.value = [];
  }
}
// Disponibiliza a função para todos os componentes filhos
provide('showNotification', showNotification)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

* {
  font-family: 'Poppins', sans-serif;
}
</style>
