<template>
  <div class="header">
    <div class="header-title">
      <div class="menu-toggle" @click="$emit('toggle-menu')">
        <span class="material-icons">menu</span>
      </div>
      <div
        v-if="pageTitle"
        class="category-icon"
        :style="{ color: categoryStore.selectedCategoryColor }"
      >
        <span class="material-icons">label</span>
      </div>
      <h1 v-if="pageTitle" class="page-title">{{ pageTitle }}</h1>
      <div class="user-profile">
        <div class="upload-button">
          <BaseButton
            text="Importar"
            icon="upload"
            variant="primary"
            size="small"
            @click="openUploadModal"
          />
        </div>
        <div class="notifications">
          <span class="material-icons">notifications</span>
        </div>
        <div class="avatar" @click="toggleUserMenu">
          <span class="material-icons">person</span>
        </div>
        <div v-if="showUserMenu" class="user-menu">
          <div class="user-menu-item" @click="goToProfile">
            <span class="material-icons">person</span>
            <span>Perfil</span>
          </div>
          <div class="user-menu-item">
            <span class="material-icons">settings</span>
            <span>Configurações</span>
          </div>
          <div class="user-menu-item logout" @click="logout">
            <span class="material-icons">logout</span>
            <span>Sair</span>
          </div>
        </div>
      </div>
    </div>
    <UploadModal
      :isOpen="showUploadModal"
      @close="closeUploadModal"
      @file-uploaded="handleFileUploaded"
    />
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { AuthService } from '@/services/auth.service'
  import BaseButton from './BaseButton.vue'
  import UploadModal from './modal/UploadModal.vue'
  import { useCategoriesStore } from '@/store/categories'

  const router = useRouter()
  const route = useRoute()
  const showUserMenu = ref(false)
  const showUploadModal = ref(false)

  const categoryStore = useCategoriesStore()

  const emit = defineEmits(['toggle-menu', 'files-updated'])

  watch(
    () => route.params.id,
    newId => {
      categoryStore.setSelectedCategory(newId)
    },
    { immediate: true }
  )

  const pageTitle = computed(() => {
    if (route.name === 'category' && route.params.name) {
      const categoryName = route.params.name.replace(/-/g, ' ')
      return categoryName
    }

    if (props.title) {
      return props.title
    }

    return null
  })

  const props = defineProps({
    title: String
  })

  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
  }

  const logout = () => {
    AuthService.logout()
    router.push('/login')
  }

  const openUploadModal = () => {
    showUploadModal.value = true
  }

  const closeUploadModal = () => {
    showUploadModal.value = false
  }

  const handleFileUploaded = () => {
    emit('files-updated')
  }

  const goToProfile = () => {
    showUserMenu.value = false
    router.push('/profile')
  }
</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .header-title {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
    gap: 5px;
  }
  .page-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    flex: 1;
    text-transform: capitalize;
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .notifications {
    position: relative;
    cursor: pointer;
    width: 36px;
    height: 36px;
    background-color: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    transition: background-color 0.2s;
  }

  .notifications:hover {
    background-color: #e5e7eb;
  }

  .avatar {
    width: 36px;
    height: 36px;
    background-color: #f3f4f6;
    color: #6b7280;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s;
  }

  .avatar:hover {
    background-color: #e5e7eb;
  }

  .user-menu {
    position: absolute;
    top: 50px;
    right: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    z-index: 100;
    min-width: 140px;
    overflow: hidden;
    backdrop-filter: blur(8px);
  }

  .user-menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    transition: all 0.2s ease;
  }

  .user-menu-item:hover {
    background: var(--bg-secondary);
    color: var(--primary-color);
  }

  .user-menu-item.logout {
    color: var(--error-color);
  }

  .user-menu-item.logout:hover {
    background: rgba(231, 76, 60, 0.1);
    color: var(--error-color);
  }

  .user-menu-item .material-icons {
    font-size: 18px;
    opacity: 0.8;
  }

  .user-menu-item:hover .material-icons {
    opacity: 1;
  }

  .upload-button {
    position: relative;
  }

  .menu-toggle {
    display: none;
    cursor: pointer;
    width: 36px;
    height: 36px;
    background-color: #f3f4f6;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    transition: background-color 0.2s;
    margin-right: 3vw;
  }

  .category-icon > span {
    margin-right: 8NNNpx;
    display: flex;
    transition: color 0.2s ease;
    font-size: 20px;
  }

  .menu-toggle:hover {
    background-color: #e5e7eb;
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }
  }
</style>
