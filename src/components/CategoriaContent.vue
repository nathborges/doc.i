<template>
    <div class="content">
        <SearchBar @search-results="handleSearchResults" />
        <div v-if="hasResults" class="section">
            <div class="section-header">
                <h2>Resultados da pesquisa</h2>
            </div>
            <div class="files-grid">
                <div v-for="result in searchResults" class="file-card">
                    <div class="file-icon">
                        <span class="material-icons">picture_as_pdf</span>
                    </div>
                    <div class="file-info">
                        <h3>{{ result.url }}</h3>
                        <p>Relevância: {{ (result.probability * 100).toFixed(0) }}%</p>
                    </div>
                </div>
                <div class="file-card">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchBar from './SearchBar.vue';

const searchResults = ref([])
const hasResults = computed(() => searchResults.value.length > 0)

const handleSearchResults = (data) => {
    console.log('Search results:', data);
    searchResults.value = data;
}
</script>

<style scoped>
.home-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-secondary);
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

.file-icon {
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