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

@media (max-width: 768px) {
  .home-container {
    flex-direction: column;
  }
  .sidebar {
    max-width: 100vw !important;
  }

  .notifications {
    display: none !important;
  }

  .avatar {
    display: none !important;
  }

  .header-fixed {
    border: 1px solid var(--border-color);
  }

  .content {
    padding: 20px !important;
  }

  .generator-container {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: row !important;
  }

  .table-body {
    overflow-x: auto;
  }

  .header-fixed{
    padding: 20px !important;
  }

  .home-container {
    flex-direction: column;
  }
  .sidebar {
    display: none;
  }
  .header-title {
    justify-content: space-between !important;
  }

  .categories-scroll {
    overflow-y: scroll;
  }

  .menu-toggle {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .table-header {
    grid-template-columns: 2fr 1fr 1fr !important;
    gap: 8px;
    padding: 8px 12px;
  }
  
  .table-row {
    grid-template-columns: 2fr 1fr 1fr !important;
    gap: 8px;
    padding: 8px 12px;
  }

  .file-type-icon {
    display: none;
  }
  
  .col-category,
  .col-status,
  .col-size {
    display: none;
  }
  
  .col-actions {
    justify-content: flex-end;
  }
  
  .files-table {
    margin: 0 -10px;
  }
  
  .table-body {
    max-height: 50vh;
  }
}

/* Scrollbar Global */
* {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

*::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

</style>
