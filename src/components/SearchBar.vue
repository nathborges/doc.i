<template>
  <div class="search">
    <div class="search-container">
      <div class="input-wrapper">
        <span class="search-icon-left material-icons">search</span>
        <input class="search-input" type="text" :placeholder="placeholder" v-model="searchQuery"
          @keyup.enter="handleSearch">
        <span class="search-icon material-icons" @click="handleSearch">search</span>
      </div>

      <transition name="slide-fade">
        <div v-if="false" class="search-results" :class="{ 'error': hasError }">
          <span class="close-icon material-icons" @click="closeResults">close</span>
          <div v-if="isSearching" class="search-loading">
            <span class="material-icons loading-icon">search</span>
            <span>Buscando...</span>
          </div>
          <div v-else-if="hasError" class="search-error">
            <span class="material-icons error-icon">error</span>
            <span>{{ errorMessage }}</span>
          </div>
          <div v-else class="search-response">
            <div class="typewriter">{{ displayedResponse }}</div>
          </div>
        </div>
      </transition>
      <div class="search-filters">
        <div v-for="(filter, index) in searchFilter" :key="index" class="search-filter-tag">
          <span class="filter-text">{{ filter }}</span>
          <span class="material-icons filter-remove" @click="removeFilter(index)">close</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { SearchService } from '@/services/search.service'


const searchQuery = ref('')
const searchFilter = ref([])
const query = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const displayedResponse = ref('')
const fullResponse = ref('Encontrei alguns documentos que podem ser relevantes para sua pesquisa. Aqui estão os resultados mais relevantes.')
const typingInterval = ref(null)
const typingComplete = ref(false)
const showResults = ref(false)
const hasSearched = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const removeCount = ref(0)

const emit = defineEmits(['search-results', 'is-loading'])

defineProps({
  category: {
    type: String,
    default: 'all'
  }
})



const placeholder = computed(() => {
  return 'Digite aqui para pesquisar dentro da categoria...';
})

const showError = () => {
  hasError.value = true
  errorMessage.value = 'Ocorreu um erro ao processar sua pesquisa. Por favor, tente novamente.'
  showResults.value = true
  displayedResponse.value = ''
}

const removeFilter = (index) => {
  searchFilter.value.splice(index, 1)
  if (searchFilter.value.length > 0) {
    handleSearch()
  }
}

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  const trimmedQuery = searchQuery.value.trim();
  const capitalizedQuery = trimmedQuery.charAt(0).toUpperCase() + trimmedQuery.slice(1);
  searchFilter.value.push(capitalizedQuery)
  
  isSearching.value = true
  displayedResponse.value = ''
  typingComplete.value = false
  showResults.value = true
  hasSearched.value = true
  hasError.value = false
  emit('search-results', [])
  emit('is-loading', true)

  query.value = searchFilter.value.join(' ')
  searchQuery.value = ''

  console.log('Pesquisando:', query.value)
  
  SearchService.ask(query.value)
    .then(data => {
      searchResults.value = data
      if (data.answer) {
        fullResponse.value = data.answer
      }
      isSearching.value = false
      
      if (data.files && data.files.length > removeCount.value) {
        data.files.splice(data.files.length - removeCount.value, removeCount.value)
      }
      
      removeCount.value += 3
      console.log(removeCount.value)
      
      emit('search-results', data.files || [])

      emit('is-loading', false)
      setTimeout(() => {
        startTyping()
      }, 300)
    })
    .catch(error => {
      emit('is-loading', false)
      isSearching.value = false
      showError()
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

const formatCategory = (category) => {
  return category.toLowerCase().replace(/\s+/g, '_');
}

const closeResults = () => {
  showResults.value = false;
}

onMounted(() => {
  return () => {
    clearInterval(typingInterval.value)
  }
})
</script>

<style scoped>
.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.search-filter-tag {
  display: flex;
  align-items: center;
  background-color: #e5e7eb;
  border-radius: 16px;
  padding: 4px 10px;
  font-size: 14px;
  color: #374151;
  transition: all 0.2s;
}

.filter-text {
  margin-right: 4px;
}

.filter-remove {
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #6B7280;
}

.filter-remove:hover {
  color: #374151;
}

.search {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}

.search-container {
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
}

.search-input {
  width: 100%;
  padding: 15px 20px 15px 45px;
  padding-right: 50px;
  font-size: 17px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-icon {
  position: absolute;
  right: 15px;
  color: #6B7280;
  cursor: pointer;
  font-size: 20px;
  transition: color 0.2s;
}

.search-icon-left {
  position: absolute;
  left: 15px;
  color: #6B7280;
  font-size: 20px;
  z-index: 1;
}

.search-icon:hover {
  color: #374151;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #6B7280;
  cursor: pointer;
  font-size: 20px;
  transition: color 0.2s;
}

.close-icon:hover {
  color: #374151;
}

.search-input:focus {
  outline: none;
  border-color: #374151;
  box-shadow: 0 0 0 2px rgba(55, 65, 81, 0.2);
}

.search-results {
  position: relative;
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
  transition: all 0.3s ease;
}

.search-results.error {
  background-color: #fff5f5;
  border: 2px solid #fed7d7;
  color: #e53e3e;
}

.search-loading,
.search-error {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  animation: pulse 1.5s infinite;
  margin-right: 10px;
}

.search-error {
  color: #e53e3e;
  padding: 15px;
}

.error-icon {
  margin-right: 10px;
  color: #e53e3e;
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

  from,
  to {
    border-color: transparent
  }

  50% {
    border-color: #374151;
  }
}

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
</style>