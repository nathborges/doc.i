<template>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { SearchService } from '@/services/search.service'
import { currentCategory, currentView } from '@/store/BaseViewState'

const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const displayedResponse = ref('')
const fullResponse = ref('Encontrei alguns documentos que podem ser relevantes para sua pesquisa. Aqui estão os resultados mais relevantes.')
const typingInterval = ref(null)
const typingComplete = ref(false)
const showResults = ref(false)
const hasSearched = ref(false)

const emit = defineEmits(['search-results'])

const placeholder = computed(() => {
  if (currentView.value == 'home' || currentCategory.value == null) {
    return 'Digite aqui para pesquisar nos seus documentos...';
  }
  return 'Digite aqui para pesquisar dentro da categoria...';
})

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  
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
    }
  }, 20)
}

onMounted(() => {
  return () => {
    clearInterval(typingInterval.value)
  }
})
</script>

<style scoped>
.search-container {
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 15px;
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
  white-space: pre-wrap;
  overflow: hidden;
  line-height: 1.5;
  animation: blink-caret 0.75s step-end infinite;
  word-wrap: break-word;
  width: 100%;
  font-size: 1rem;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #374151; }
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
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
</style>