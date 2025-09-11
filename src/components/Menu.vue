<template>
  <div v-if="isOpen" class="overlay" @click="$emit('close')"></div>
  <div class="sidebar" :class="{ 'mobile-open': isOpen }">
    <div class="logo" @click="goToHome">
      <img src="@/assets/images/doci-logo.png" alt="Doci" />
    </div>
    <div class="menu">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="menu-item"
        :class="{ active: isActiveRoute(item.route) }"
        @click="handleMenuClick(item.id)"
      >
        <span class="material-icons">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </div>

      <div v-if="hasCategories" class="categories-section">
        <div class="categories-header">
          <span class="categories-title">Categorias</span>
          <span class="material-icons add-icon" @click="openCreateCategoryModal"
            >add</span
          >
        </div>
        <div class="categories-list">
          <div
            v-for="category in categories"
            class="category-item"
            :class="{
              active:
                route.name === 'category' &&
                route.params.name ===
                  category.name.toLowerCase().replace(/\s+/g, '-')
            }"
            @click="handleCategoryClick(category)"
          >
            <div
              class="category-dot"
              :style="{ backgroundColor: category.color }"
            ></div>
            <span class="category-name">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="storage-container">
      <div class="storage">
        <div class="storage-info">
          <h4>Armazenamento</h4>
          <p>{{ storageText }}</p>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: storagePercentage }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useCategoriesStore } from '@/store/categories'
  import { useRouter, useRoute } from 'vue-router'

  const categoriesStore = useCategoriesStore()
  const router = useRouter()
  const route = useRoute()

  const emit = defineEmits(['open-create-category', 'close'])

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  })

  const menuItems = [
    { id: 'home', icon: 'home', label: 'Início', route: '/' },
    { id: 'recent', icon: 'schedule', label: 'Recentes', route: '/recent' },
    { id: 'favorites', icon: 'star', label: 'Favoritos', route: '/favorites' },
    { id: 'shared', icon: 'share', label: 'Compartilhados', route: '/shared' },
    { id: 'trash', icon: 'delete', label: 'Lixeira', route: '/trash' }
  ]

  const categories = computed(() => categoriesStore.categories)
  const isLoading = computed(() => categoriesStore.isLoading)
  const hasCategories = computed(
    () => categories.value && categories.value.length > 0 && !isLoading.value
  )

  const storageUsed = computed(() => {
    return import.meta.env.VITE_USER_STORAGE_USED || '7.5GB'
  })

  const storageTotal = computed(() => {
    return import.meta.env.VITE_USER_STORAGE_TOTAL || '15GB'
  })

  const storageText = computed(() => {
    return `${storageUsed.value} de ${storageTotal.value} usado`
  })

  const storagePercentage = computed(() => {
    const used = parseFloat(storageUsed.value.replace('GB', ''))
    const total = parseFloat(storageTotal.value.replace('GB', ''))
    return `${Math.round((used / total) * 100)}%`
  })

  const isActiveRoute = routePath => {
    return route.path === routePath
  }

  const handleMenuClick = itemId => {
    const item = menuItems.find(i => i.id === itemId)
    if (item) {
      router.push(item.route)
      emit('close')
    }
  }

  const handleCategoryClick = category => {
    const normalizedName = category.name.toLowerCase().replace(/\s+/g, '-')
    router.push({
      name: 'category',
      params: {
        name: normalizedName,
        id: category.id
      }
    })
    emit('close')
  }

  const openCreateCategoryModal = () => {
    emit('open-create-category')
  }

  const goToHome = () => {
    router.push('/')
    emit('close')
  }
</script>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
  }

  @media (max-width: 768px) {
    .overlay {
      display: block;
    }

    .sidebar {
      position: fixed;
      left: -100%;
      top: 0;
      z-index: 1000;
      width: 280px;
      height: 100vh;
      transition: left 0.3s ease;
    }

    .sidebar.mobile-open {
      left: 0;
    }
  }

  .add-icon {
    border-radius: 4px;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 16px;
    padding: 2px;
    transition: all 0.2s;
  }

  .add-icon:hover {
    background-color: var(--bg-secondary);
  }

  .categories-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0 12px;
  }

  .categories-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    max-height: 200px;
    overflow-y: auto;
    scrollbar-color: var(--border-color) transparent;
    scrollbar-width: thin;
  }

  .categories-list::-webkit-scrollbar {
    width: 4px;
  }

  .categories-list::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
  }

  .categories-list::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
  }

  .categories-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .categories-section {
    margin-top: 24px;
  }

  .categories-title {
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
  }

  .category-dot {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    flex-shrink: 0;
    height: 10px;
    width: 10px;
  }

  .category-item {
    align-items: center;
    border-radius: 6px;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    font-size: 13px;
    font-weight: 500;
    gap: 8px;
    padding: 6px 12px;
    transition: all 0.2s;
  }

  .category-item.active {
    background-color: #f0f9f0;
    color: #4a7c59;
    font-weight: 500;
  }

  .category-item:hover {
    background-color: var(--bg-secondary);
  }

  .category-name {
    flex: 1;
  }

  .logo {
    display: flex;
    justify-content: center;
    max-height: 100px;
    padding: 30px;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .logo:hover {
    opacity: 0.8;
  }

  .logo img {
    height: 100%;
  }

  .menu {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 2px;
    padding: 16px;
  }

  .menu-item {
    align-items: center;
    border-radius: 6px;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    font-size: 13px;
    font-weight: 500;
    gap: 8px;
    padding: 8px 12px;
    transition: all 0.2s;
  }

  .menu-item.active {
    background-color: #f0f9f0;
    color: #4a7c59;
    font-weight: 500;
  }

  .menu-item .material-icons {
    color: var(--text-secondary);
    font-size: 16px;
  }

  .menu-item:hover {
    background-color: var(--bg-secondary);
  }

  .progress {
    background: linear-gradient(90deg, var(--primary-color) 0%, #22c55e 100%);
    border-radius: 4px;
    height: 100%;
    transition: width 0.3s ease;
  }

  .progress-bar {
    background-color: #e5e7eb;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    height: 8px;
    overflow: hidden;
  }

  .sidebar {
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 15vw;
    min-width: 250px;
  }

  .storage {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
  }

  .storage-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 16px;
    width: 100%;
  }

  .storage-info {
    margin-bottom: 12px;
  }

  .storage-info h4 {
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 4px 0;
  }

  .storage-info p {
    color: var(--text-secondary);
    font-size: 12px;
    line-height: 1.4;
    margin: 0;
  }
</style>