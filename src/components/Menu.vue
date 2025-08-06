<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/images/doci-logo.png" alt="Doci" class="logo-image" />
    </div>
    <div class="menu">
      <div class="menu-item" :class="{ active: route.path === '/' }" @click="handleMenuClick('home')">
        <span>Home</span>
      </div>
      <div>
        <div class="menu-item" @click="toggleCategories">
          <span>Minhas Categorias</span>
          <span v-if="hasCategories" class="material-icons expand-icon">{{ showCategorias ? 'expand_less' :
            'expand_more' }}</span>
        </div>
        <div v-if="showCategories" class="submenu">
          <div v-for="category in categories" class="submenu-item"
            :class="{ active: route.name === 'category' && route.params.name === category.name }"
            @click="handleCategoryClick(category.name)">
            <div class="category-dot" :style="{ backgroundColor: category.color }"></div>
            <span>{{ category.name }}</span>
          </div>
        </div>
      </div>
      <div class="menu-item">
        <span>Members</span>
      </div>
    </div>
    <div class="storage">
      <div class="storage-info">
        <h4>Storage</h4>
        <p>7.5GB of 15GB used</p>
      </div>
      <div class="progress-bar">
        <div class="progress" style="width: 50%"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { FileService } from '@/services/files.service';
import { computed } from 'vue';
import { useCategoriesStore } from '@/store/CategoriesStore';
import { useRouter, useRoute } from 'vue-router';

const categoriesStore = useCategoriesStore();
const router = useRouter();
const route = useRoute();

const showCategories = ref(false);
const hasCategories = computed(() => categories.value.length > 0);
const categories = computed(() => categoriesStore.categories.value)

const handleMenuClick = (item) => {
  if (item === 'home') {
    router.push('/');
  } else {
    router.push({ name: item });
  }
};


const handleCategoryClick = (category) => {
  router.push({ name: 'category', params: { name: category } });
};

const toggleCategories = () => {
  if (!hasCategories.value) return;
  showCategories.value = !showCategories.value;
};

onMounted(async () => {
  await categoriesStore.fetchCategories();
});

</script>

<style scoped>
/* Sidebar */
.sidebar {
  width: 280px;
  background-color: var(--bg-primary);
  padding: 50px 25px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  border-right: 1px solid var(--border-color);
  font-family: 'Inter', sans-serif !important;
  gap: 30px;
}

.logo h2 {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.5px;
}

.button-item {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  margin-bottom: 8px;
  border-radius: 12px;
}

.menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  display: flex;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 15px;
  font-weight: 400;
  color: var(--text-primary);
  gap: 3px
}


.menu-item:hover {
  background-color: var(--bg-secondary);
}

.menu-item.active {
  font-weight: 800;
}

.menu-item .material-icons {
  font-size: 17px;
  margin-right: 8px;
  margin-bottom: 3px;
}

.menu-item .expand-icon {
  font-size: 20px;
}

.submenu {
  margin-left: 25px;
  font-size:15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.submenu-item {
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: var(--text-secondary);
  gap: 8px;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.submenu-item:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.submenu-item .material-icons {
  margin-right: 5px;
  font-size: 20px;
}

.storage {
  margin-top: auto;
  padding: 20px;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.storage-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}

.storage-info h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.storage-info p {
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
}

.progress-bar {
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
}
</style>