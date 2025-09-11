<template>
  <div class="profile-content">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Carregando perfil...</p>
    </div>

    <template v-else>
      <div class="profile-header">
        <div class="profile-avatar">
          <img :src="user.avatar" :alt="user.name" />
        </div>
        <div class="profile-info">
          <h1>{{ user.name }}</h1>
          <p class="profile-email">{{ user.email }}</p>
          <p class="profile-role">{{ user.role }}</p>
        </div>
        <button class="edit-btn">
          <span class="material-icons">edit</span>
          Editar Perfil
        </button>
      </div>

      <div class="profile-stats">
        <div class="stat-card">
          <span class="material-icons">folder</span>
          <div class="stat-info">
            <h3>{{ user.stats.categories }}</h3>
            <p>Categorias</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">description</span>
          <div class="stat-info">
            <h3>{{ user.stats.documents }}</h3>
            <p>Arquivos</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">auto_awesome</span>
          <div class="stat-info">
            <h3>{{ user.stats.insights }}</h3>
            <p>Insights</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">storage</span>
          <div class="stat-info">
            <h3>{{ storageUsed }}</h3>
            <p>Armazenamento</p>
          </div>
        </div>
      </div>

      <div class="profile-sections">
        <div class="section">
          <h2>Informações Pessoais</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Nome Completo</label>
              <span>{{ user.name }}</span>
            </div>
            <div class="info-item">
              <label>Email</label>
              <span>{{ user.email }}</span>
            </div>
            <div class="info-item">
              <label>Telefone</label>
              <span>{{ user.phone }}</span>
            </div>
            <div class="info-item">
              <label>Cargo</label>
              <span>{{ user.role }}</span>
            </div>
            <div class="info-item">
              <label>Departamento</label>
              <span>{{ user.department }}</span>
            </div>
            <div class="info-item">
              <label>Data de Cadastro</label>
              <span>{{ formatDate(user.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Configurações</h2>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <span class="material-icons">notifications</span>
                <div>
                  <h4>Notificações</h4>
                  <p>Receber notificações por email</p>
                </div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.notifications" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <span class="material-icons">dark_mode</span>
                <div>
                  <h4>Tema Escuro</h4>
                  <p>Usar tema escuro na interface</p>
                </div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.darkMode" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { UserService } from '@/services/user.service'

const user = ref({
  name: '',
  email: '',
  phone: '(11) 99999-9999',
  role: 'Usuário',
  department: 'Geral',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  createdAt: new Date().toISOString(),
  stats: {
    categories: 0,
    documents: 0,
    insights: 0
  }
})

const settings = ref({
  notifications: true,
  darkMode: false
})

const isLoading = ref(true)

const storageUsed = computed(() => {
  return import.meta.env.VITE_USER_STORAGE_USED || '7.5GB'
})

const loadProfile = async () => {
  try {
    const profileData = await UserService.getProfile()

    if (profileData.userInformation) {
      user.value.name = profileData.userInformation.name
      user.value.email = profileData.userInformation.email
    }

    // Manter dados mockados para campos não retornados pela API
    user.value.stats = {
      categories: 12,
      documents: 248,
      insights: 34
    }

  } catch (error) {
    console.error('Erro ao carregar perfil:', error)
    // Manter dados mockados em caso de erro
    user.value.name = 'Usuário'
    user.value.email = 'usuario@exemplo.com'
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.profile-content {
  margin: 0 auto;
  padding: 20px;
  width: 70vw;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-secondary);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
}

.profile-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
}

.profile-email {
  color: var(--text-secondary);
  margin: 0 0 5px 0;
}

.profile-role {
  color: var(--primary-color);
  font-weight: 500;
  margin: 0;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn:hover {
  background: var(--primary-color);
  color: white;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
}

.stat-card .material-icons {
  font-size: 32px;
  color: var(--primary-color);
}

.stat-info h3 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
}

.stat-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  white-space: nowrap;
}

.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.section h2 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.info-item span {
  font-size: 14px;
  color: var(--text-primary);
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.setting-info .material-icons {
  color: var(--text-secondary);
}

.setting-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
}

.setting-info p {
  margin: 0;
  font-size: 12px;
  color: var(--text-secondary);
}

.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>