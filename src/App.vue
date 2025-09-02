<template>
    <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition>
    <Notification 
      v-if="notifications.length > 0 && $route.name !== 'login'" 
      :notifications="notifications" 
      @close="() => closeNotification(index)"
      :autoClose="false"
    />
</template>

<script setup>
import { ref, provide } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Notification from './components/Notification.vue'

const $route = useRoute()

const notifications = ref([])

const showNotification = (fileName, status = 'info', duration = 3000) => {
  notifications.value.push({
    fileName,
    status,
    duration
  })
}

const closeNotification = (index) => {
  if (index !== undefined) {
    notifications.value.splice(index, 1);
  } else {
    notifications.value = [];
  }
}
provide('showNotification', showNotification)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

* {
  font-family: 'Inter', sans-serif;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Layout Global */
.home-container {
  background-color: var(--bg-secondary);
  display: flex;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
}

.main-content {
  display: flex;
  flex: 10;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header-fixed {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.content-area {
  flex: 1;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  max-height: 100vh;
}

</style>
