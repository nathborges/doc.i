<template>
  <div 
    v-if="show" 
    class="notification" 
    :class="type"
  >
    <div class="notification-content">
      <span>{{ message }}</span>
      <button @click="close" class="close-btn">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: 'Notificação'
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  },
  autoClose: {
    type: Boolean,
    default: true
  }
});

const show = ref(true);
let timer = null;

const close = () => {
  show.value = false;
};

onMounted(() => {
  if (props.autoClose && props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});

defineExpose({ close });
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 250px;
  max-width: 350px;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slide-in 0.3s ease-out;
}

.notification-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  color: inherit;
  opacity: 0.7;
}

.close-btn:hover {
  opacity: 1;
}

.info {
  background-color: #e3f2fd;
  color: #0d47a1;
  border-left: 4px solid #2196f3;
}

.success {
  background-color: #e8f5e9;
  color: #1b5e20;
  border-left: 4px solid #4caf50;
}

.warning {
  background-color: #fff8e1;
  color: #ff6f00;
  border-left: 4px solid #ffc107;
}

.error {
  background-color: #ffebee;
  color: #b71c1c;
  border-left: 4px solid #f44336;
}

@keyframes slide-in {
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