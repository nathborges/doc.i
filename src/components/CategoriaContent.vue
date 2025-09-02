<template>
    <div class="content">
        <InsightGenerator :category="category" @insights-generated="handleInsightsGenerated" />
        <section class="results-section">
            <header class="section-header">
                <h2>Resultados</h2>
            </header>
            <div v-if="isLoading" class="loading-container">
                <div class="loading-spinner"></div>
                <p>Carregando...</p>
            </div>
            <FileTable 
                v-else-if="searchResults.length > 0"
                :files="searchResults" 
                :show-category="false"
                @open-file="handleOpenFile"
                @delete-file="deleteFile"
            />

            <div v-else class="no-results">
                <p>Nenhum documento encontrado.</p>
            </div>

        </section>
    </div>
</template>

<script setup>
import { onMounted, reactive, toRefs, watch } from 'vue';
import InsightGenerator from './InsightGenerator.vue'
import FileTable from './FileTable.vue'
import { FileService } from '@/services/files.service'
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


const handleOpenFile = (file) => {
    if (file.fileLocation) {
        window.open(file.fileLocation, '_blank')
    }
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    flex: 10;
    overflow: hidden;
    padding: 40px;
}

.results-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 0;
    flex: 1;
    overflow-y: auto;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-header h2 {
    font-size: 20px;
    margin: 0;
    font-weight: 600;
    color: var(--text-primary);
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>