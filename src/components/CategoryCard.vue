<template>
  <div class="category-card" @click="handleClick">
    <div class="category-icon" :style="{ 
      backgroundColor: category.color?.background || category.color,
      color: category.color?.item || 'white'
    }">
      <span class="material-icons">{{ category.icon || 'folder' }}</span>
    </div>
    <div class="category-info">
      <h3>{{ category.name }}</h3>
      <p>{{ subtitle || 'Categoria' }}</p>
      <div class="file-count">
        {{ category.fileCount || 0 }} arquivos
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router';

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
const router = useRouter()

const handleClick = () => {
  router.push({ name: 'category', params: { name: props.category.name } });
};

</script>

<style scoped>
.category-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  min-width: 180px;
  flex-shrink: 0;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.category-icon .material-icons {
  font-size: 20px;
}

.category-info h3 {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-info p {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-count {
  font-size: 12px;
  color: var(--text-placeholder);
  font-weight: 500;
}
</style>