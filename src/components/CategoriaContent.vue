<template>
    <div class="content">
        <SearchBar @search-results="handleSearchResults" :category="category" />
        <div  class="section">
            <div class="section-header">
                <h2>Resultado</h2>
            </div>
            <div v-if="hasResults" class="files-grid">
                <div v-for="result in searchResults" class="file-card" @click="openFileUrl(result.url)">
                    <div class="file-icon">
                        <span class="material-icons">picture_as_pdf</span>
                    </div>
                    <div class="file-info">
                        <h3>{{ result.filename }}</h3>
                        <p>Relevância: {{ result.probability  }}%</p>
                        <p>Relevância: {{ result.extension  }}%</p>
                    </div>
                </div>
                <!-- <div class="file-card">
                    <div class="file-icon">
                        <span class="material-icons">description</span>
                    </div>
                    <div class="file-info">
                        <h3>Proposta Cliente</h3>
                        <p>Modificado: 5 dias atrás</p>
                    </div>
                </div>
                <div class="file-card">
                    <div class="file-icon">
                        <span class="material-icons">image</span>
                    </div>
                    <div class="file-info">
                        <h3>Apresentação</h3>
                        <p>Modificado: 1 semana atrás</p>
                    </div>
                </div>
                <div class="file-card">
                    <div class="file-icon">
                        <span class="material-icons">grid_on</span>
                    </div>
                    <div class="file-info">
                        <h3>Planilha Financeira</h3>
                        <p>Modificado: 2 semanas atrás</p>
                    </div>
                </div> -->
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
    console.log(searchResults.value)
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