<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import Menu from '@/components/Menu.vue'
import BaseContent from '@/components/BaseContent.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import CategoriaContent from '@/components/CategoriaContent.vue'
import CreateCategoryModal from '@/components/modal/CreateCategoryModal.vue'
import { useCategoriesStore } from '@/store/CategoriesStore'

const route = useRoute()
const categoriesStore = useCategoriesStore()
const showCreateCategoryModal = ref(false)
const showNotification = inject('showNotification')

const currentComponent = computed(() => {
  if (route.name === 'category') {
    return CategoriaContent
  }
  return BaseContent
})

const componentProps = computed(() => {
  if (route.name === 'category') {
    return { category: route.params.name }
  }
  return {}
})

const handleOpenCreateCategory = () => {
  showCreateCategoryModal.value = true
}

const handleCloseCreateCategory = () => {
  showCreateCategoryModal.value = false
}

const handleCategoryCreated = () => {
  categoriesStore.fetchCategories()
  showCreateCategoryModal.value = false
}

const handleCategoryError = (message) => {
  showNotification(message, 'error', 5000)
}

onMounted(async () => {
  await categoriesStore.fetchCategories()
})
</script>

<template>
  <div class="home-container">
    <Menu @open-create-category="handleOpenCreateCategory" />
    <div class="main-content">
      <HeaderBar class="header-fixed" />
      <div class="content-area">
        <component :is="currentComponent" v-bind="componentProps" />
      </div>
    </div>
    <CreateCategoryModal 
      :is-open="showCreateCategoryModal" 
      @close="handleCloseCreateCategory"
      @created="handleCategoryCreated"
      @error="handleCategoryError"
    />
  </div>
</template>

<style scoped>
.content-area {
  flex: 1;
  padding: 30px;
}

.header-fixed {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.home-container {
  background-color: var(--bg-secondary);
  display: flex;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
}

.main-content {
  display: flex;
  flex: 10;
  flex-direction: column;
  height: 100vh;
}
</style>