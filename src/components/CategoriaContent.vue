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
            <div v-else-if="searchResults.length > 0" class="files-grid">
                <BaseCard v-for="result in searchResults" :key="result.id" :title="result.fileName"
                    :subtitle="`${formatFileSize(result.fileSize)} • ${formatDate(result.createdAt)}`"
                    :icon="getFileIcon(result.fileName)"
                    :icon-style="{ background: '#fff', border: '1px solid var(--border-color)', color: '#d32f2f' }"
                    :show-menu="true" :clickable="false" :menu-id="`file-${result.id}`"
                    @menu-toggle="(isOpen) => handleMenuToggle(result.id, isOpen)">
                    <template #menu-items>
                        <button @click="openFile(result.fileLocation); closeMenu()" class="menu-item">
                            <span class="material-icons">download</span>
                            Baixar
                        </button>
                        <button @click="deleteFile(result.id); closeMenu()" class="menu-item delete">
                            <span class="material-icons">delete</span>
                        </button>
                    </template>
                    <template #tags>
                        <span class="status-tag processed">Processado</span>
                    </template>
                </BaseCard>
            </div>
            <div v-else class="no-results">
                <p>Nenhum documento encontrado.</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue';
import InsightGenerator from './InsightGenerator.vue'
import BaseCard from './BaseCard.vue'
import { FileService } from '@/services/files.service'
import { useFileIcons } from '@/composables/useFileIcons'
import { useGlobalState } from '@/composables/useGlobalState'
import { useCategoriesStore } from '@/store/CategoriesStore'
import BaseButton from './BaseButton.vue'

const props = defineProps({
    category: {
        type: String,
        required: true
    }
});

const state = reactive({
    searchResults: [],
    isLoading: false,
    activeMenu: null
})

const { searchResults, isLoading, activeMenu } = toRefs(state)
const { getFileIcon } = useFileIcons()
const { addNotification } = useGlobalState()
const categoriesStore = useCategoriesStore()

const setLoadingState = (loading) => {
    state.isLoading = loading
}

const updateSearchResults = (results) => {
    state.searchResults = results
}

const handleInsightsGenerated = (insights) => {
    console.log('Insights gerados:', insights)
}

const handleMenuToggle = (fileId, isOpen) => {
    state.activeMenu = isOpen ? fileId : null
}

const closeMenu = () => {
    state.activeMenu = null
}

const deleteFile = async (fileId) => {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
        try {
            await FileService.deleteFile(fileId)
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
        const categoryId = getCategoryId(props.category)
        if (!categoryId) {
            throw new Error('Categoria não encontrada')
        }
        const files = await FileService.getFiles(categoryId)
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

const getCategoryId = (normalizedName) => {
    const category = categoriesStore.categories.value.find(cat => {
        const catNormalized = cat.name.toLowerCase().replace(/\s+/g, '-')
        return catNormalized === normalizedName
    })

    return category?.id
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

onMounted(async () => {
    await categoriesStore.fetchCategories()
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
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-primary);
}

.menu-item:hover {
    background: var(--bg-secondary);
}

.menu-item.delete {
    color: #d32f2f;
}

.menu-item .material-icons {
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>