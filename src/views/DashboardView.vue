<script setup>
import { ref, computed, onMounted } from 'vue'
import Menu from '@/components/Menu.vue'
import BaseContent from '@/components/BaseContent.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import { currentView, currentCategory } from '@/store/BaseViewState';
import CategoriaContent from '@/components/CategoriaContent.vue';
import { useCategoriesStore } from '@/store/CategoriesStore';
const categoriesStore = useCategoriesStore();

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'home':
      return BaseContent;
    case 'categoria':
      return CategoriaContent;
  }
});

const componentKey = computed(() => {
  if (currentView.value === 'categoria') {
    return `${currentView.value}-${currentCategory.value}`;
  }
  return currentView.value;
});

// Carrega as categorias quando o componente é montado
onMounted(async () => {
  await categoriesStore.fetchCategories();
});
</script>

<template>
  <div class="home-container">
    <Menu />
    <div class="main-content">
      <HeaderBar />
      <!-- Content -->
      <div class="content">
        <component :is="currentComponent" :key="componentKey"/>
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
  flex: 2;
  padding: 50px 100px;
  overflow-y: auto;
}



</style>