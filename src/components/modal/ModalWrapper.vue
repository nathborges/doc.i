<template>
  <div class="modal-wrapper" @click="$emit('close')">
    <div class="modal-content" :style="{ width: width }" @click.stop>
      <button class="close-btn" @click="$emit('close')">
        <span class="material-icons">close</span>
      </button>
      <div class="modal-header" v-if="title">
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>
      <slot />
      <div class="modal-footer" v-if="$slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: '550px'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  padding-bottom: 30px;
  background-color: var(--bg-primary);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  z-index: 10;
}

.close-btn:hover {
  background: var(--bg-secondary);
}

.modal-header {
  text-align: center;
  margin-bottom: 10px;
}

.modal-header h1 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
}

.modal-header p {
  margin: 0;
  color: var(--text-secondary);
}

.modal-footer {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}

.modal-footer button {
  color: var(--text-light);
  border: none;
  cursor: pointer;
  padding: 12px 24px;
  font-weight: 700;
  transition: background-color 0.3s;
  border-radius: 8px;
  background-color: var(--primary-color);
  min-width: 120px;
}

.modal-footer button:hover {
  opacity: 0.9;
}
</style>