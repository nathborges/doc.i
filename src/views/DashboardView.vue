<script setup>
  import { ref, computed, onMounted, inject } from 'vue'
  import { useRoute } from 'vue-router'
  import Menu from '@/components/Menu.vue'
  import BaseContent from '@/components/Dashboard/BaseContent.vue'
  import HeaderBar from '@/components/HeaderBar.vue'
  import CategoriaContent from '@/components/Category/CategoriaContent.vue'
  import CreateCategoryModal from '@/components/modal/CreateCategoryModal.vue'
  import { useCategoriesStore } from '@/store/CategoriesStore'

  const route = useRoute()
  const categoriesStore = useCategoriesStore()
  const showCreateCategoryModal = ref(false)
  const showNotification = inject('showNotification')
  const isMobileMenuOpen = ref(false)

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

  const handleCategoryError = message => {
    showNotification(message, 'error', 5000)
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  onMounted(async () => {
    await categoriesStore.fetchCategories()
  })
</script>

<template>
  <div class="home-container">
    <Menu
      @open-create-category="handleOpenCreateCategory"
      :isOpen="isMobileMenuOpen"
      @close="closeMobileMenu"
    />
    <div class="main-content">
      <HeaderBar class="header-fixed" @toggle-menu="toggleMobileMenu" />
      <component :is="currentComponent" v-bind="componentProps" />
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
  .header-fixed {
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);

    .menu-toggle {
      display: none;
    }
  }
</style>
