<template>
    <div class="content">
        <SearchBar @search-results="updateSearchResults" @refresh-page="loadCategoryFiles" :category="category" @is-loading="setLoadingState" />
        <section class="results-section">
            <header class="section-header">
                <h2>Resultados</h2>
                <BaseButton text="Exportar" icon="download" @click="exportToExcel" />
            </header>
            <div v-if="isLoading" class="loading-container">
                <div class="loading-spinner"></div>
                <p>Carregando...</p>
            </div>
            <div v-else-if="searchResults.length > 0" class="files-grid">
                <div v-for="result in searchResults" :key="result.filename" 
                     class="file-card" 
                     @click="openFile(result.url)"
                     @keydown.enter="openFile(result.url)"
                     tabindex="0"
                     role="button">
                    <div class="file-icon">
                        <span class="material-icons">{{ getFileIcon(result.extension) }}</span>
                    </div>
                    <div class="file-info">
                        <h3>{{ result.filename }}</h3>
                        <p>Relevância: {{ result.probability }}%</p>
                    </div>
                </div>
            </div>
            <div v-else class="no-results">
                <p>Nenhum documento encontrado.</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, reactive, toRefs } from 'vue';
import SearchBar from './SearchBar.vue';
import { FileService } from '@/services/files.service';
import { filterHighProbabilityFiles } from '@/utils/fileUtils';
import { useFileIcons } from '@/composables/useFileIcons';
import { useGlobalState } from '@/composables/useGlobalState';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const state = reactive({
  searchResults: [],
  isLoading: false
})

const { searchResults, isLoading } = toRefs(state)
const { getFileIcon } = useFileIcons()
const { addNotification } = useGlobalState()

const setLoadingState = (loading) => {
  state.isLoading = loading
}

const updateSearchResults = (data) => {
  state.searchResults = filterHighProbabilityFiles(data)
}

const openFile = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}

const loadCategoryFiles = async () => {
  state.isLoading = true
  try {
    const files = await FileService.getFiles()
    state.searchResults = filterHighProbabilityFiles(files)
  } catch (error) {
    console.error('Error loading files:', error)
    addNotification({
      type: 'error',
      message: 'Error loading files. Please try again.',
      duration: 5000
    })
  } finally {
    state.isLoading = false
  }
}

const exportToExcel = () => {
    try {
        const fileUrl = '/planilhas/relatorio.xlsx';
        
        const link = document.createElement("a");
        link.setAttribute("href", fileUrl);
        link.setAttribute("download", "relatorio.xlsx");
        document.body.appendChild(link);
        
        link.click();
        
        document.body.removeChild(link);
        
        addNotification({
            type: 'success',
            message: 'Report exported successfully!'
        })
    } catch (error) {
        addNotification({
            type: 'error',
            message: 'Error exporting report. Please try again.'
        })
    }
}

onMounted(() => {
  loadCategoryFiles()
})


</script>

<style scoped>

.content {
    gap: 20px;
    display: flex;
    flex-direction: column;
}


.results-section {
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

.file-card:hover,
.file-card:focus {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
  outline: none;
}

.no-results {
  text-align: center;
  padding: 40px 0;
  color: var(--text-secondary);
}



.file-icon {
    width: 54px;
    height: 54px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    background-color: var(--bg-secondary);
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

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    width: 100%;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--bg-secondary);
    border-top: 4px solid var(--accent-green);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>