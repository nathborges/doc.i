<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/images/doci-logo.png" alt="Doci" class="logo-image" />
    </div>
    <div class="menu">
      <div class="menu-item" :class="{ active: currentView === 'home' }" @click="handleMenuClick('home')">
        <span class="material-icons">home</span>
        <span>Home</span>
      </div>
      <div>
        <div class="menu-item" @click="toggleCategorias">
          <span class="material-icons">bookmarks</span>
          <span>Minhas Categorias</span>
          <span v-if="hasCategorias" class="material-icons expand-icon">{{ showCategorias ? 'expand_less' :
            'expand_more' }}</span>
        </div>
        <div v-if="showCategorias" class="submenu">
          <div v-for="categoria in categorias" class="submenu-item"
            :class="{ active: currentView === 'categoria' && currentCategory === categoria.name }"
            @click="handleCategoriaClick(categoria.name)">
            <span class="material-icons" :style="{ color: categoria.color }">bookmark</span>
            <span>{{ categoria.name }}</span>
          </div>
        </div>
      </div>
      <div class="menu-item">
        <span class="material-icons">star</span>
        <span>Favoritos</span>
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
import { nextTick, onMounted, ref } from 'vue';
import { FileService } from '@/services/files.service';
import { computed } from 'vue';
import { currentView, changeView } from '@/store/BaseViewState';

const showCategorias = ref(false);
const categorias = ref([]);
const hasCategorias = computed(() => categorias.value.length > 0);

const handleMenuClick = (item) => {
  console.log('Menu item clicked:', item);
};

const handleCategoriaClick = (categoria) => {
  changeView('categoria', categoria);
};

const toggleCategorias = () => {
  if (!hasCategorias.value) return;
  showCategorias.value = !showCategorias.value;
};

onMounted(async () => {
  categorias.value = await FileService.getCategorias();
  nextTick()
});

</script>

<style scoped>
/* Sidebar */
.sidebar {
  width: 280px;
  background-color: var(--bg-primary);
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  border-right: 1px solid var(--border-color);
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
  margin-left: auto;
  margin-right: 0;
  font-size: 20px;
}

.submenu {
  margin-left: 30px;
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
  justify-content: space-between;
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
  background-color: var(--primary-color);
}
</style>