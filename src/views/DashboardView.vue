<script setup>
import { ref, computed, onMounted } from 'vue'
import Menu from '@/components/Menu.vue'
import BaseContent from '@/components/BaseContent.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import { currentView } from '@/store/BaseViewState';
import CategoriaContent from '@/components/CategoriaContent.vue';
import { useCategoriesStore } from '@/store/CategoriesStore';

// Inicializa a store de categorias
const categoriesStore = useCategoriesStore();

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'home':
      return BaseContent;
    case 'categoria':
      return CategoriaContent;
  }
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
        <component :is="currentComponent"/>
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
  padding: 50px 50px;
  overflow-y: auto;
}



</style>