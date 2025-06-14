<template>
    <div class="header">
        <div class="header-title">
            <h1>{{ initialText }}</h1>
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
        <div class="search-container">
            <input class="search-input" type="text" :placeholder="placeholder" v-model="searchQuery"
                @keyup.enter="handleSearch">

            <transition name="slide-fade">
                <div v-if="showResults" class="search-results">
                    <div v-if="isSearching" class="search-loading">
                        <span class="material-icons loading-icon">search</span>
                        <span>Buscando...</span>
                    </div>
                    <div v-else class="search-response">
                        <div class="typewriter">{{ displayedResponse }}</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service'
import { SearchService } from '@/services/search.service'
import ImportButton from '@/components/ImportButton.vue'
import { currentCategory, currentView } from '@/store/BaseViewState';

const router = useRouter()
const searchQuery = ref('')
const showUserMenu = ref(false)
const searchResults = ref([])
const isSearching = ref(false)
const displayedResponse = ref('')
const fullResponse = ref('Encontrei alguns documentos que podem ser relevantes para sua pesquisa. Aqui estão os resultados mais relevantes.')
const typingInterval = ref(null)
const typingComplete = ref(false)
const showResults = ref(false)
const hasSearched = ref(false)

const emit = defineEmits(['search-results', 'ready'])

const initialText = computed(() => {
    if (currentView.value == 'home' || currentCategory.value == null) {
        return 'Bem vindo de volta!';
    }
    return currentCategory.value;
})

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}

const handleSearch = () => {
    isSearching.value = true
    displayedResponse.value = ''
    typingComplete.value = false
    showResults.value = true
    hasSearched.value = true

    SearchService.ask(searchQuery.value)
        .then(data => {
            searchResults.value = data
            if (data.answer) {
                fullResponse.value = data.answer
            } else {
                fullResponse.value = 'Encontrei alguns documentos que podem ser relevantes para sua pesquisa. Aqui estão os resultados mais relevantes.'
            }
            isSearching.value = false
            emit('search-results', data)
            
            setTimeout(() => {
                startTyping()
            }, 300)
        })
        .catch(error => {
            console.error('Erro na pesquisa:', error)
            isSearching.value = false
        })
}

const startTyping = () => {
    let i = 0
    clearInterval(typingInterval.value)
    displayedResponse.value = ''
    
    typingInterval.value = setInterval(() => {
        if (i < fullResponse.value.length) {
            displayedResponse.value += fullResponse.value.charAt(i)
            i++
        } else {
            clearInterval(typingInterval.value)
            typingComplete.value = true
            emit('ready')
        }
    }, 20)
}

const placeholder = computed(() => {
    if (currentView.value == 'home' || currentCategory.value == null) {
        return 'Digite aqui para pesquisar nos seus documentos...';
    }

    return 'Digite aqui para pesquisar nos seus documentos dentro da categoria...';
})

const logout = () => {
    AuthService.logout()
    router.push('/login')
}

onMounted(() => {
    return () => {
        clearInterval(typingInterval.value)
    }
})
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
}

.search-container {
    width: 100%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.search-input {
    width: 100%;
    padding: 15px 20px;
    font-size: 17px;
    border: 2px solid #d1d5db;
    border-radius: 12px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s, box-shadow 0.2s;

}

.search-input:focus {
    outline: none;
    border-color: #374151;
    box-shadow: 0 0 0 2px rgba(55, 65, 81, 0.2);
}

.search-icon {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    color: var(--text-secondary);
    transition: color 0.2s;
}

.search-icon:hover {
    color: var(--primary-color);
}

.search-results {
    width: 100%;
    max-width: 100%;
    background-color: white;
    border-top: none;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    color: #374151;
    z-index: 5;
    margin-bottom: 1.5rem;
    overflow-y: auto;
    max-height: 400px;
}

.search-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.loading-icon {
    animation: pulse 1.5s infinite;
    margin-right: 10px;
}

.search-response {
    padding: 10px 0;
    width: 100%;
    overflow-x: hidden;
}

.typewriter {
    border-right: 2px solid #374151;
    white-space: pre-wrap;
    overflow: hidden;
    line-height: 1.5;
    animation: blink-caret 0.75s step-end infinite;
    word-wrap: break-word;
    width: 100%;
}

@keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #374151; }
}

/* Animações */
@keyframes pulse {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}

@keyframes slideDownFade {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.slide-fade-enter-active {
    animation: slideDownFade 0.5s ease-out;
}

.slide-fade-leave-active {
    animation: slideDownFade 0.5s ease-in reverse;
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
