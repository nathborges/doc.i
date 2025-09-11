<template>
  <Teleport to="body">
    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="toast.type"
      >
        <span class="material-icons">{{ getIcon(toast.type) }}</span>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const toasts = ref([])

  const getIcon = type => {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    }
    return icons[type] || 'info'
  }

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const toast = { id, message, type }

    toasts.value.push(toast)

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = id => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  onMounted(() => {
    window.showToast = addToast
  })
</script>

<style scoped>
  .toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 8px;
    background: white;
    color: #374151;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
    min-width: 300px;
    border-left: 4px solid;
  }

  .toast.success {
    border-left-color: #10b981;
  }

  .toast.success .material-icons {
    color: #10b981;
  }

  .toast.error {
    border-left-color: #ef4444;
  }

  .toast.error .material-icons {
    color: #ef4444;
  }

  .toast.warning {
    border-left-color: #f59e0b;
  }

  .toast.warning .material-icons {
    color: #f59e0b;
  }

  .toast.info {
    border-left-color: #3b82f6;
  }

  .toast.info .material-icons {
    color: #3b82f6;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
