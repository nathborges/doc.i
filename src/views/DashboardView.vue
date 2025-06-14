<script setup>
import { ref, computed } from 'vue'
import Menu from '@/components/Menu.vue'
import BaseContent from '@/components/BaseContent.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import { currentView } from '@/store/BaseViewState';
import CategoriaContent from '@/components/CategoriaContent.vue';

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'home':
      return BaseContent;
    case 'categoria':
      return CategoriaContent;
  }
});

const searchResults = ref([])

const handleSearchResults = (results) => {
  searchResults.value = results
}

</script>

<template>
  <div class="home-container">
    <Menu />
    <div class="main-content">
      <HeaderBar @search-results="handleSearchResults"/>
      <!-- Content -->
      <div class="content">
        <component :is="currentComponent" :results="searchResults.value"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-secondary);
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 50px 50px;
  overflow-y: auto;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 17px;
  border: 2px solid #d1d5db; /* Tailwind's gray-300 */
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 1.5rem;
}

.search-input:focus {
  outline: none;
  border-color: #374151; /* gray-700 */
  box-shadow: 0 0 0 2px rgba(55, 65, 81, 0.2); /* focus:ring */
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 14px;
}

.notifications {
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var( --text-primary);
  border: 1px solid var(--border-color);
}

.avatar {
  width: 42px;
  height: 42px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 1px solid var(--border-color);
}

.user-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  width: 200px;
  z-index: 100;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.user-menu-item {
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-primary);
}

.user-menu-item:hover {
  background-color: var(--bg-secondary);
}

.user-menu-item.logout {
  border-top: 1px solid var(--border-color);
  color: var(--error-color);
}

.user-menu-item svg {
  margin-right: 12px;
  width: 16px;
}

.content h1 {
  margin-bottom: 8px;
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.subtitle {
  color: var(--text-secondary);
  margin-bottom: 40px;
  font-size: 16px;
}

.section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-header h2 {
  font-size: 20px;
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
}

.view-all {
  background: none;
  border: none;
  color: var(--primary-color);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-size: 15px;
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
}

.file-card {
  background-color: var(--bg-primary);
  border-radius: 16px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--border-color);
}

.file-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-color);
}

.file-icon {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.file-icon svg {
  font-size: 22px;
  color: var(--text-light);
}

.file-icon.pdf {
  background-color: var(--error-color);
}

.file-icon.doc {
  background-color: var(--primary-color);
}

.file-icon.img {
  background-color: var(--success-color);
}

.file-icon.xls {
  background-color: var(--warning-color);
}

.file-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.file-info p {
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>