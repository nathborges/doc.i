<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/images/doci-logo.png" alt="Doci" class="logo-image" />
    </div>
    <div class="menu">
      <div v-for="item in menuItems" :key="item.id" class="menu-item" :class="{ active: isActiveRoute(item.route) }"
        @click="handleMenuClick(item.id)">
        <span class="material-icons">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </div>

      <div v-if="hasCategories" class="categories-section">
        <div class="categories-header">
          <span class="categories-title">Categorias</span>
          <span class="material-icons add-icon" @click="openCreateCategoryModal">add</span>
        </div>
        <div class="categories-list">
          <div v-for="category in categories" class="category-item"
            :class="{ active: route.name === 'category' && route.params.name === category.name }"
            @click="handleCategoryClick(category.name)">
            <div class="category-dot" :style="{ backgroundColor: category.color || '#3b82f6' }"></div>
            <span class="category-name">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="storage">
      <div class="storage-info">
        <h4>Armazenamento</h4>
        <p>7.5GB de 15GB usado</p>
      </div>
      <div class="progress-bar">
        <div class="progress" style="width: 50%"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, computed } from 'vue'
import { FileService } from '@/services/files.service'
import { useCategoriesStore } from '@/store/CategoriesStore'
import { useRouter, useRoute } from 'vue-router'

const categoriesStore = useCategoriesStore()
const router = useRouter()
const route = useRoute()

const emit = defineEmits(['open-create-category'])

const menuItems = [
  { id: 'home', icon: 'home', label: 'Início', route: '/' },
  { id: 'recent', icon: 'schedule', label: 'Recentes', route: '/recent' },
  { id: 'favorites', icon: 'star', label: 'Favoritos', route: '/favorites' },
  { id: 'shared', icon: 'share', label: 'Compartilhados', route: '/shared' },
  { id: 'trash', icon: 'delete', label: 'Lixeira', route: '/trash' }
]

const categories = computed(() => categoriesStore.categories.value)
const hasCategories = computed(() => categories.value && categories.value.length > 0)

const isActiveRoute = (routePath) => {
  return route.path === routePath
}

const handleMenuClick = (itemId) => {
  const item = menuItems.find(i => i.id === itemId)
  if (item) {
    router.push(item.route)
  }
}

const handleCategoryClick = (category) => {
  router.push({ name: 'category', params: { name: category } })
}

const openCreateCategoryModal = () => {
  emit('open-create-category')
}

onMounted(async () => {
  await categoriesStore.fetchCategories()
  nextTick()
})

</script>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #ffffff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  gap: 24px;
}

.menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  gap: 8px;
}

.menu-item:hover {
  background-color: var(--bg-secondary);
}

.menu-item.active {
  background-color: #f0f9f0;
  font-weight: 500;
  color: #4a7c59;
}

.menu-item .material-icons {
  font-size: 16px;
  color: var(--text-secondary);
}



.categories-section {
  margin-top: 24px;
}

.categories-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-bottom: 8px;
}

.categories-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.add-icon {
  font-size: 16px;
  color: var(--primary-color);
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  transition: all 0.2s;
}

.add-icon:hover {
  background-color: var(--bg-secondary);
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  gap: 8px;
}

.category-item:hover {
  background-color: var(--bg-secondary);
}

.category-item.active {
  background-color: #f0f9f0;
  font-weight: 500;
  color: #4a7c59;
}

.category-name {
  flex: 1;
}







.category-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}



.storage {
  margin-top: auto;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 12px;
}

.storage-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.storage-info h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.storage-info p {
  margin: 0;
  font-size: 12px;
  color: var(--text-secondary);
}

.progress-bar {
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #15803D;
}
</style>