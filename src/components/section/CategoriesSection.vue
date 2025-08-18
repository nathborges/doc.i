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
        v-for="category in categories" 
        :key="category.name" 
        :category="category" 
        :subtitle="category.description || 'Descrição não disponível'"
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
import { computed, onMounted, ref } from 'vue'
import { useCategoriesStore } from '@/store/CategoriesStore'
import CategoryCard from '../CategoryCard.vue'
import SectionWrapper from './SectionWrapper.vue'
import CreateCategoryModal from '../modal/CreateCategoryModal.vue'
import { useRouter } from 'vue-router'

const categoriesStore = useCategoriesStore()
const router = useRouter()

const categories = computed(() => categoriesStore.categories.value)
const isLoading = computed(() => categoriesStore.isLoading.value)

onMounted(async () => {
  await categoriesStore.fetchCategories()
})

const handleCategoryClick = (category) => {
  router.push({ name: 'category', params: { name: category.name } })
}

const showModal = ref(false)

const handleCreateCategory = () => {
  showModal.value = true
}

const handleModalClose = () => {
  showModal.value = false
}

const handleCategoryCreated = () => {
  categoriesStore.fetchCategories()
}
</script>

<style scoped>
.categories-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) transparent;
}

.categories-scroll::-webkit-scrollbar {
  height: 6px;
}

.categories-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.categories-scroll::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.categories-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>