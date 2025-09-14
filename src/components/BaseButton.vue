<template>
  <button :type="type" :class="['base-btn', variant, size]" :disabled="disabled" @click="$emit('click')">
    <span v-if="icon" class="material-icons">{{ icon }}</span>
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  icon: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.base-btn {
  color: var(--text-light);
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Tamanhos */
.small {
  padding: 8px 16px;
  font-size: 0.9rem;
  min-height: 40px;
}

.medium {
  padding: 10px 20px;
  font-size: 1rem;
  min-height: 40px;
}

.large {
  padding: 12px 24px;
  font-size: 1rem;
  min-height: 44px;
}

/* Variantes */
.primary {
  background-color: var(--primary-color);
}

.primary:hover:not(:disabled) {
  background-color: var(--primary-color-hover);
}

.secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.secondary:hover:not(:disabled) {
  background-color: var(--bg-primary);
}

.text {
  background: none;
  color: var(--primary-color);
  padding: 6px 12px;
  min-height: 32px;
}

.text:hover:not(:disabled) {
  background-color: var(--bg-secondary);
}

.base-btn .material-icons {
  font-size: 16px;
}
</style>
