<template>
    <div class="content">
        <SearchBar @search-results="handleSearchResults" :category="category" />
        <div  class="section">
            <div class="section-header">
                <h2>Resultado</h2>
                <button class="view-all">Exportar</button>
            </div>
            <div v-if="hasResults" class="files-grid">
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
import { ref, computed, watchEffect } from 'vue';
import SearchBar from './SearchBar.vue';
import { FileService } from '@/services/files.service';
import { currentCategory, currentView } from '@/store/BaseViewState'

const searchResults = ref([])
const hasResults = computed(() => searchResults.value.length > 0)

const handleSearchResults = (data) => {
    searchResults.value = data;
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
    if (currentCategory.value == null) {
        return;
    }
    searchResults.value = await FileService.getFiles(currentCategory.value);
}

watchEffect(() => {
    if (currentCategory.value) {
        getAllFilesFromCategory();
    }
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
</style>