<template>
  <SectionWrapper 
    title="Categorias"
    button-text="Nova Categoria"
    button-icon="add"
    @button-click="handleCreateCategory"
  >
    <div v-if="isLoading" class="empty-state">
      <p>Carregando categorias...</p>
    </div>
    <div v-else-if="categories.length === 0" class="empty-state">
      <p>Nenhuma categoria encontrada</p>
    </div>
    <div v-else class="categories-scroll">
      <CategoryCard 
        v-for="(category, index) in categories" 
        :key="category.id || category.name" 
        :category="category" 
        :style="{ animationDelay: `${index * 0.1}s` }"
        class="category-item"
        @click="handleCategoryClick"
      />
    </div>
  </SectionWrapper>
  
  <CreateCategoryModal 
    :is-open="showModal" 
    @close="handleModalClose"
    @created="handleCategoryCreated"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCategoriesStore } from '@/store/CategoriesStore'
import CategoryCard from '../CategoryCard.vue'
import SectionWrapper from './SectionWrapper.vue'
import CreateCategoryModal from '../modal/CreateCategoryModal.vue'
import { useRouter } from 'vue-router'

const categoriesStore = useCategoriesStore()
const router = useRouter()

const categories = computed(() => categoriesStore.categories.value)
const isLoading = computed(() => categoriesStore.isLoading.value)

const handleCategoryClick = (category) => {
  if (category?.name) {
    router.push({ name: 'category', params: { name: category.name } })
  }
}

const showModal = ref(false)

const handleCreateCategory = () => {
  showModal.value = true
}

const handleModalClose = () => {
  showModal.value = false
}

const handleCategoryCreated = async() => {
  await categoriesStore.fetchCategories()
}
</script>

<style scoped>
.categories-scroll {
  display: flex;
  gap: 16px;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 12px;
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) var(--bg-secondary);
  white-space: nowrap;
  width: 100%;
}

.categories-scroll::-webkit-scrollbar {
  height: 8px;
}

.categories-scroll::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

.categories-scroll::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.categories-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

.category-item {
  animation: slideInUp 0.6s ease-out both;
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
</style>