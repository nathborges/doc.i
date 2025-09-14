<template>
  <div v-if="show" class="notification" :class="type">
    <div class="flex-horizontal title">
      <span> Uploads </span>
      <button class="close-button" @click="close">
        <span class="material-icons">close</span>
      </button>
    </div>

    <div class="notification-content">
      <div v-for="notification in notifications" class="notifications">
        <span class="filename" :title="notification.fileName">
          {{ notification.fileName }}</span
        >
        <span class="icon">
          <span class="material-icons" :class="notification.status">{{
            getMaterialIconForStatus(notification.status)
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    notifications: {
      type: Array,
      default: []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  })

  const show = ref(true)
  let timer = null

  const close = () => {
    emit('close')
  }

  const emit = defineEmits(['close'])

  const getMaterialIconForStatus = status => {
    console.log(status)
    switch (status) {
      case 'success':
        return 'check_circle'
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      default:
        return 'info'
    }
  }

  onMounted(() => {
    if (props.autoClose && props.duration > 0) {
      timer = setTimeout(() => {
        close()
      }, props.duration)
    }
  })

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })

  defineExpose({ close })
</script>

<style scoped>
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    min-width: 280px;
    max-width: 400px;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    z-index: 1000;
    animation: slide-in 0.3s ease-out;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    backdrop-filter: blur(8px);
  }

  .notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: left;
  }

  .close-btn {
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
  }

  .title {
    font-weight: var(--font-semibold);
    margin-bottom: 12px;
    align-items: center;
    justify-content: space-between;
    color: var(--text-primary);
    font-size: 14px;
  }

  .notifications {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100%;
    margin-bottom: 8px;
    gap: 8px;
    align-items: center;
    padding: 8px 0;
  }

  .filename {
    flex: 2;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    color: var(--text-primary);
    font-size: 13px;
    position: relative;
  }

  .filename:hover {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    line-height: 1.3;
  }

  .icon {
    flex: 0.5;
    display: flex;
    justify-content: center;
  }

  .close-btn:hover {
    opacity: 1;
  }

  .icon .success {
    color: var(--success-color, #10b981);
  }

  .icon .error {
    color: var(--error-color, #ef4444);
  }

  .icon .warning {
    color: var(--warning-color, #f59e0b);
  }

  .icon .info {
    color: var(--primary-color);
  }

  .close-button {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.2rem;
    cursor: pointer;
    width: auto;
    padding: 0px 5px 5px 5px;
    z-index: 1001;
  }

  .close-button:hover {
    color: var(--primary-color);
  }

  @keyframes slide-in {
    from {
      transform: translateY(100%);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
