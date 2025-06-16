<template>
    <div class="content">
        <SearchBar @search-results="handleSearchResults" @refresh-page="refreshPage" :category="category" @is-loading="handleIsLoading" />
        <div  class="section">
            <div class="section-header">
                <h2>Resultado</h2>
                <button class="view-all" @click="exportToExcel">Exportar</button>
            </div>
            <div v-if="isLoading" class="loading-container">
                <div class="loading-spinner"></div>
                <p>Carregando...</p>
            </div>
            <div v-else-if="hasResults" class="files-grid">
                <div v-for="result in searchResults" class="file-card" @click="openFileUrl(result.url)">
                    <div class="file-icon">
                        <span class="material-icons">{{ getFileIcon(result.extension) }}</span>
                    </div>
                    <div class="file-info">
                        <h3>{{ result.filename }}</h3>
                        <p>Relevância: {{ result.probability }}%</p>
                    </div>
                </div>
            </div>
            <div v-else class="files-grid">
                <p>Nenhum documento encontrado. </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import SearchBar from './SearchBar.vue';
import { FileService } from '@/services/files.service';
import { filterHighProbabilityFiles } from '@/utils/fileUtils';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const searchResults = ref([])
const hasResults = computed(() => searchResults.value.length > 0)

const isLoading = ref(false)

const handleIsLoading = (bool) => {
    isLoading.value = bool;
}

const refreshPage = () => {
    getAllFilesFromCategory();
}

const handleSearchResults = (data) => {
    searchResults.value = filterHighProbabilityFiles(data);
}

const getFileIcon = (extension) => {
    if (!extension) return 'insert_drive_file';
    
    extension = extension.toLowerCase();
    
    switch (extension) {
        case 'pdf':
            return 'picture_as_pdf';
        case 'doc':
        case 'docx':
        case 'txt':
        case 'rtf':
            return 'description';
        case 'xls':
        case 'xlsx':
        case 'csv':
            return 'grid_on';
        case 'ppt':
        case 'pptx':
            return 'slideshow';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'svg':
            return 'image';
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'wmv':
            return 'videocam';
        case 'mp3':
        case 'wav':
        case 'ogg':
            return 'audiotrack';
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
            return 'folder_zip';
        case 'html':
        case 'htm':
        case 'xml':
            return 'code';
        default:
            return 'insert_drive_file';
    }
};

const openFileUrl = (url) => {
    if (url) {
        window.open(url, '_blank');
    }
}

const getAllFilesFromCategory = async () => {
    isLoading.value = true;
    const files = await FileService.getFiles();
    searchResults.value = filterHighProbabilityFiles(files);
    isLoading.value = false;
}

const exportToExcel = () => {
    // URL da planilha estática (substitua pelo caminho correto)
    const fileUrl = '/planilhas/relatorio.xlsx';
    
    // Criar link para download
    const link = document.createElement("a");
    link.setAttribute("href", fileUrl);
    link.setAttribute("download", "relatorio.xlsx");
    document.body.appendChild(link);
    
    // Iniciar download
    link.click();
    
    // Remover o link
    document.body.removeChild(link);
}

onMounted(() => {
    getAllFilesFromCategory();
});


</script>

<style scoped>

.content {
    gap: 20px;
    display: flex;
    flex-direction: column;
}
.content h1 {
    font-size: 32px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.5px;
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

.view-all {
  background: none;
  border: none;
  color: var(--accent-green);
  font-weight: 500;
  cursor: pointer;
  font-size: 15px;
  padding: 15px 40px;
}

.view-all:hover {
    color: var(--primary-color);
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