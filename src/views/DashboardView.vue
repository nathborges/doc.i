<script setup>
import { ref, computed, onMounted } from 'vue'
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
    />
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-secondary);
}

.main-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

</style>