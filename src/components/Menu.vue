<template>
  <div class="sidebar">
    <div class="logo">
        <img src="@/assets/images/doci-logo.png" alt="Doci" class="logo-image" />
      </div>
    <div class="menu">
      <div class="button-item">
        <ImportButton />
      </div>
      <div class="menu-item active">
        <font-awesome-icon icon="home" />
        <span>Home</span>
      </div>
      <div class="menu-item">
        <font-awesome-icon icon="folder" />
        <span>Meus Documentos</span>
      </div>
      <div class="menu-item">
        <font-awesome-icon icon="star" />
        <span>Favoritos</span>
      </div>
      <div class="menu-item">
        <font-awesome-icon icon="trash" />
        <span>Lixeira</span>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ImportButton from './ImportButton.vue';
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
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  margin-bottom: 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 15px;
  color: var(--text-secondary);
}

.menu-item:hover {
  background-color: var(--bg-secondary);
}

.menu-item.active {
  background-color: var(--primary-color-light);
  color: var(--primary-color);
  font-weight: 600;
}

.menu-item svg {
  margin-right: 15px;
  width: 18px;
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