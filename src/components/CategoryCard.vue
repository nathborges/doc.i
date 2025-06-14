<template>
  <div class="category-card" @click="handleClick">
    <div class="category-icon" :style="{ backgroundColor: category.color }">
      <font-awesome-icon icon="folder" />
    </div>
    <div class="category-info">
      <h3>{{ category.name }}</h3>
      <p>{{ subtitle || 'Categoria' }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.category)
}
</script>

<style scoped>
.category-card {
  background-color: var(--bg-primary);
  border-radius: 16px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.category-icon {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.category-icon svg {
  font-size: 22px;
  color: var(--text-light);
}

.category-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.category-info p {
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>