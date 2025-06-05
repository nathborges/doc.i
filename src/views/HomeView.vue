<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { AuthService } from '../services'

const router = useRouter()
const searchQuery = ref('')
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  AuthService.logout()
  router.push('/login')
}
</script>

<template>
  <div class="home-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo">
        <h2>Doc.i</h2>
      </div>
      <div class="menu">
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

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <div class="header">
        <div class="search-bar">
          <font-awesome-icon icon="search" />
          <input 
            type="text" 
            placeholder="Pesquisar documentos..." 
            v-model="searchQuery"
          >
        </div>
        <div class="user-profile">
          <div class="notifications">
            <font-awesome-icon icon="bell" />
          </div>
          <div class="avatar" @click="toggleUserMenu">NB</div>
          <div v-if="showUserMenu" class="user-menu">
            <div class="user-menu-item">
              <font-awesome-icon icon="user" />
              <span>Perfil</span>
            </div>
            <div class="user-menu-item">
              <font-awesome-icon icon="cog" />
              <span>Configurações</span>
            </div>
            <div class="user-menu-item logout" @click="logout">
              <font-awesome-icon icon="sign-out-alt" />
              <span>Sair</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="content">
        <h1>Bem-vindo de volta!</h1>
        <p class="subtitle">Aqui estão seus documentos recentes</p>

        <!-- Recent Files -->
        <div class="section">
          <div class="section-header">
            <h2>Documentos Recentes</h2>
            <button class="view-all">Ver todos</button>
          </div>
          <div class="files-grid">
            <div class="file-card">
              <div class="file-icon pdf">
                <font-awesome-icon icon="file-pdf" />
              </div>
              <div class="file-info">
                <h3>Relatório Mensal</h3>
                <p>Modificado: 2 dias atrás</p>
              </div>
            </div>
            <div class="file-card">
              <div class="file-icon doc">
                <font-awesome-icon icon="file-word" />
              </div>
              <div class="file-info">
                <h3>Proposta Cliente</h3>
                <p>Modificado: 5 dias atrás</p>
              </div>
            </div>
            <div class="file-card">
              <div class="file-icon img">
                <font-awesome-icon icon="file-image" />
              </div>
              <div class="file-info">
                <h3>Apresentação</h3>
                <p>Modificado: 1 semana atrás</p>
              </div>
            </div>
            <div class="file-card">
              <div class="file-icon xls">
                <font-awesome-icon icon="file-excel" />
              </div>
              <div class="file-info">
                <h3>Planilha Financeira</h3>
                <p>Modificado: 2 semanas atrás</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Shared Files -->
        <div class="section">
          <div class="section-header">
            <h2>Compartilhados com você</h2>
            <button class="view-all">Ver todos</button>
          </div>
          <div class="files-grid">
            <div class="file-card">
              <div class="file-icon pdf">
                <font-awesome-icon icon="file-pdf" />
              </div>
              <div class="file-info">
                <h3>Manual do Usuário</h3>
                <p>Compartilhado por: João Silva</p>
              </div>
            </div>
            <div class="file-card">
              <div class="file-icon doc">
                <font-awesome-icon icon="file-word" />
              </div>
              <div class="file-info">
                <h3>Contrato</h3>
                <p>Compartilhado por: Maria Oliveira</p>
              </div>
            </div>
          </div>
        </div>
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
  font-family: 'General Sans', sans-serif;
}

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

.logo {
  margin-bottom: 50px;
}

.logo h2 {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.5px;
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

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 30px 50px;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 12px 20px;
  width: 450px;
  border: 1px solid var(--border-color);
}

.search-bar svg {
  color: var(--text-secondary);
  margin-right: 12px;
}

.search-bar input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 15px;
  background-color: transparent;
  color: var(--text-primary);
}

.user-profile {
  display: flex;
  align-items: center;
}

.notifications {
  margin-right: 25px;
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.avatar {
  width: 42px;
  height: 42px;
  background-color: var(--primary-color);
  color: var(--text-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  position: relative;
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