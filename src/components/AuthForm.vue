<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
    
    <button
      type="submit"
      class="input-style submit-btn"
      :disabled="isLoading"
      :class="{ loading: isLoading }"
    >
      <span v-if="!isLoading">{{ submitText }}</span>
      <span v-if="isLoading" class="loading-content">
        <span class="spinner"></span>
        {{ loadingText }}
      </span>
    </button>

    <slot name="footer" />
  </form>
</template>

<script setup>
defineProps({
  isLoading: Boolean,
  submitText: String,
  loadingText: String
})

defineEmits(['submit'])
</script>

<style scoped>
.submit-btn {
  transition: all 0.3s ease;
}

.submit-btn.loading {
  background-color: var(--primary-color-hover) !important;
  cursor: not-allowed;
}

.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>