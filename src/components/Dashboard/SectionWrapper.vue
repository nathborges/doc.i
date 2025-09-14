<template>
  <div class="section">
    <div class="section-header">
      <h2>{{ title }}</h2>
      <BaseButton :text="buttonText" :icon="buttonIcon" :variant="buttonVariant" size="small"
        @click="$emit('button-click')" />
    </div>
    <slot />
  </div>
</template>

<script setup>
import BaseButton from '../BaseButton.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  buttonIcon: {
    type: String,
    default: null
  },
  buttonVariant: {
    type: String,
    default: 'primary'
  }
})

defineEmits(['button-click'])
</script>

<style scoped>
.section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* .section-header h2 {
  font-size: 18px;
  margin: 0;
  font-weight: var(--font-semibold);
  color: var(--text-primary);
} */
</style>
