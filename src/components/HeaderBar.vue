<template>
      <div class="header">
        <div class="header-title">
          <h1>{{  initialText }}</h1>
          <div class="user-profile">
            <div class="notifications">
              <span class="material-icons">notifications</span>
            </div>
            <div class="avatar" @click="toggleUserMenu"><span class="material-icons">person</span>
            </div>
            <div v-if="showUserMenu" class="user-menu">
              <div class="user-menu-item">
                <font-awesome-icon icon="cog" />
                <span>Configurações</span>
              </div>
              <div class="user-menu-item logout" @click="logout">
                <font-awesome-icon icon="sign-out-alt" />
                <span>Sair</span>
              </div>
            </div>
            <ImportButton />
          </div>
        </div>

          <input class="search-input" type="text" placeholder="Pesquisar documentos..." v-model="searchQuery" @keyup.enter="handleSearch" @click="handleSearch">
      </div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service'
import { SearchService } from '@/services/search.service'
import ImportButton from '@/components/ImportButton.vue'

const router = useRouter()
const searchQuery = ref('')
const showUserMenu = ref(false)
const searchResults = ref(null)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    SearchService.ask(searchQuery.value)
      .then(data => {
        searchResults.value = data
        console.log('Resultados:', data)
      })
      .catch(error => console.error('Erro na pesquisa:', error))
  }
}

const logout = () => {
  AuthService.logout()
  router.push('/login')
}
</script>


<style scoped>
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
  border: 2px solid #d1d5db;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 1.5rem;
}

.search-input:focus {
  outline: none;
  border-color: #374151;
  box-shadow: 0 0 0 2px rgba(55, 65, 81, 0.2);
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
  color: var(--text-primary);
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
</style>