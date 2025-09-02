<template>
    <div class="content">
        <InsightGenerator :category="category" @insights-generated="handleInsightsGenerated" />
        <section class="results-section">
            <header class="section-header">
                <h2>Resultados</h2>
            </header>
            <div class="files-container">
                <div v-if="isLoading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Carregando...</p>
                </div>
                <div v-else-if="searchResults.length > 0" class="files-table">
                    <div class="table-header">
                        <div class="col-name">Nome</div>
                        <div class="col-status">Status</div>
                        <div class="col-modified">Modificado</div>
                        <div class="col-size">Tamanho</div>
                        <div class="col-actions">Ações</div>
                    </div>
                    <div class="table-row" v-for="result in searchResults" :key="result.id">
                        <div class="col-name">
                            <span class="material-icons file-type-icon">{{ getFileIcon(result.fileName) }}</span>
                            {{ result.fileName }}
                        </div>
                        <div class="col-status">
                            <span class="status-tag processed">Processado</span>
                        </div>
                        <div class="col-modified">{{ formatDate(result.createdAt) }}</div>
                        <div class="col-size">{{ formatFileSize(result.fileSize) }}</div>
                        <div class="col-actions">
                            <button @click="openFile(result.fileLocation)" class="action-btn">
                                <span class="material-icons">download</span>
                            </button>
                            <button @click="deleteFile(result.id)" class="action-btn delete">
                                <span class="material-icons">delete</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="no-results">
                    <p>Nenhum documento encontrado.</p>
                </div>

            </div>

        </section>
    </div>
</template>

<script setup>
import { onMounted, reactive, toRefs, watch } from 'vue';
import InsightGenerator from './InsightGenerator.vue'
import BaseCard from './BaseCard.vue'
import { FileService } from '@/services/files.service'
import { useFileIcons } from '@/composables/useFileIcons'
import { useGlobalState } from '@/composables/useGlobalState'
import { useRoute } from 'vue-router';

const router = useRoute();

watch(() => router.params.id, async (newId) => {
    if (newId) {
        await loadCategoryFiles()
    }
})

const state = reactive({
    searchResults: [],
    isLoading: false,
    activeMenu: null
})

const { searchResults, isLoading, activeMenu } = toRefs(state)
const { getFileIcon } = useFileIcons()
const { addNotification } = useGlobalState()


const handleInsightsGenerated = (insights) => {
    console.log('Insights gerados:', insights)
}

const closeMenu = () => {
    state.activeMenu = null
}

const deleteFile = async (fileId) => {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
        try {
            await FileService.deleteFile(fileId, router.params.id)
            state.searchResults = state.searchResults.filter(file => file.id !== fileId)
            addNotification({
                type: 'success',
                message: 'Arquivo excluído com sucesso!'
            })
        } catch (error) {
            addNotification({
                type: 'error',
                message: 'Erro ao excluir arquivo. Tente novamente.'
            })
        }
    }
}


const openFile = (url) => {
    if (url) {
        window.open(url, '_blank')
    }
}

const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
}

const loadCategoryFiles = async () => {
    state.isLoading = true
    try {
        if (!router.params.id) {
            throw new Error('Categoria não encontrada')
        }
        const files = await FileService.getFiles(router.params.id)
        state.searchResults = files
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


onMounted(async () => {
    await loadCategoryFiles()
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

.files-table {
    background: var(--bg-primary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    overflow: hidden;
}

.table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    background: var(--bg-secondary);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
}

.table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    border-top: 1px solid var(--border-color);
    align-items: center;
    transition: background-color 0.2s;
    font-size: 14px;
}

.table-row:hover {
    background: var(--bg-secondary);
}

.col-name {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: var(--text-primary);
}

.col-status,
.col-modified,
.col-size {
    color: var(--text-secondary);
    font-size: 13px;
}

.col-actions {
    display: flex;
    gap: 8px;
}

.file-type-icon {
    font-size: 18px;
    color: #ef4444;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    color: var(--text-secondary);
    transition: all 0.2s;
}

.action-btn:hover {
    background: var(--bg-secondary);
    color: var(--primary-color);
}

.action-btn.delete:hover {
    color: #d32f2f;
}

.action-btn .material-icons {
    font-size: 16px;
}

.status-tag {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
}

.status-tag.processed {
    background: #e8f5e8;
    color: #2e7d32;
}

.no-results {
    text-align: center;
    padding: 40px 0;
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

.files-container {
    overflow-x: scroll;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>