<template>
  <Transition name="modal" appear>
    <div class="modal-wrapper" @click="$emit('close')">
      <div class="modal-content" :style="{ width: width }" @click.stop>
        <button class="close-btn" @click="$emit('close')">
          <span class="material-icons">close</span>
        </button>
        <div
          class="modal-header animate-item"
          v-if="title"
          style="animation-delay: 0.1s"
        >
          <h1>{{ title }}</h1>
          <p v-if="description">{{ description }}</p>
        </div>
        <div class="animate-item" style="animation-delay: 0.2s">
          <slot />
        </div>
        <div
          class="modal-footer animate-item"
          v-if="$slots.footer"
          style="animation-delay: 0.3s"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
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
    margin-bottom: 20px;
  }

  .modal-header p {
    margin: 0;
    color: var(--text-secondary);
  }

  .modal-footer {
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

  .modal-enter-active {
    transition: all 0.3s ease;
  }

  .modal-leave-active {
    transition: all 0.2s ease;
  }

  .modal-enter-from {
    opacity: 0;
  }

  .modal-enter-from .modal-content {
    transform: scale(0.9) translateY(-20px);
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-leave-to .modal-content {
    transform: scale(0.95);
  }

  .animate-item {
    animation: slideInUp 0.4s ease-out both;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Estilos globais para formulários em modais */
  :deep(.form-group) {
    display: flex;
    flex-direction: column;
    gap: 0.7vh;
  }

  :deep(.modal-body) {
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-bottom: 2vh;
  }

  :deep(label) {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 15px;
  }
</style>
