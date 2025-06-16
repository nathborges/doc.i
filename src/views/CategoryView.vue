<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Menu from '@/components/Menu.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import { useCategoriesStore } from '@/store/CategoriesStore';
import CategoriaContent from '@/components/CategoriaContent.vue';

const route = useRoute();
const categoryName = computed(() => route.params.name);
const categoriesStore = useCategoriesStore();

onMounted(async () => {
  await categoriesStore.fetchCategories();
});
</script>

<template>
  <div class="home-container">
    <Menu />
    <div class="main-content">
      <HeaderBar :title="categoryName" />
      <!-- Content -->
      <div class="content">
        <CategoriaContent :category="categoryName" />
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