<script setup>
import { ref, computed, onMounted } from 'vue'
import Menu from '@/components/Menu.vue'
import BaseContent from '@/components/BaseContent.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import CategoriaContent from '@/components/CategoriaContent.vue';
import { useCategoriesStore } from '@/store/CategoriesStore';
const categoriesStore = useCategoriesStore();

onMounted(async () => {
  await categoriesStore.fetchCategories();
});
</script>

<template>
  <div class="home-container">
    <Menu />
    <div class="main-content">
      <HeaderBar/>
      <div class="content">
        <BaseContent />
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

.main-content {
  flex: 2;
  padding: 50px 100px;
  overflow-y: auto;
}

</style>