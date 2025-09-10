<template>
  <button class="create-btn" @click="$emit('click')">
    <span class="material-icons">add</span>
    {{ text }}
  </button>
</template>

<script setup>
  defineProps({
    text: {
      type: String,
      default: 'Nova Categoria'
    }
  })

  defineEmits(['click'])
</script>

<style scoped>
  .create-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
  }

  .create-btn:hover {
    background: var(--primary-color-dark);
    transform: translateY(-1px);
  }

  .create-btn .material-icons {
    font-size: 18px;
  }
</style>
