<template>
  <div v-if="show" class="notification" :class="type">
    <div class="flex-horizontal title">
      <span> Uploads </span>
      <button @click="close" class="close-btn">&times;</button>
    </div>

    <div class="notification-content">
      <div v-for="notification in notifications" class="notifications">
        <span class="filename"> {{ notification.fileName }}</span>
        <span class="icon"> <font-awesome-icon :class="notification.status"
            :icon="getIconForStatus(notification.status)" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  notifications: {
    type: Array,
    default: []
  },
  autoClose: {
    type: Boolean,
    default: true
  }
});

const show = ref(true);
let timer = null;

const close = () => {
  emit('close');
};

const emit = defineEmits(['close']);

const getIconForStatus = (status) => {
  console.log(status)
  switch (status) {
    case 'success':
      return 'check-circle';
    case 'error':
      return 'exclamation-circle';
    case 'warning':
      return 'exclamation-triangle';
    default:
      return 'info-circle';
  }
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
  bottom: 20px;
  right: 20px;
  min-width: 250px;
  max-width: 350px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slide-in 0.3s ease-out;
  background-color: white;
  border-color: #0d47a1;
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
  font-weight: 700;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
}

.notifications {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  margin-bottom: 5px;
  gap: 5px;
  align-items: center
}

.filename {
  flex: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
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
  color: #4caf50;
}

.icon .error {
  color: #f44336;
}

.icon .warning {
  color: #ffc107;
}

.icon .info {
  color: #2196f3;
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