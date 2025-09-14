<template>
  <div class="content">
    <InsightGenerator
      :category="category"
      @insights-generated="handleInsightsGenerated"
    />
    <section class="results-section">
      <header class="section-header">
        <h2>Resultados</h2>
      </header>
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
      <BaseFileTable
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
  import { onMounted, reactive, toRefs, watch } from 'vue'
  import InsightGenerator from './InsightGenerator.vue'
  import BaseFileTable from '../BaseFileTable.vue'
  import { FileService } from '@/services/files.service'
  import { useRoute } from 'vue-router'
  import { useCategoriesStore } from '@/store/categories'

  const router = useRoute()
  const categoriesStore = useCategoriesStore()

  watch(
    () => router.params.id,
    async newId => {
      if (newId) {
        localStorage.setItem('lastSelectedCategory', newId)
        await loadCategoryFiles()
      }
    }
  )

  const state = reactive({
    searchResults: [],
    isLoading: false
  })

  const { searchResults, isLoading } = toRefs(state)

  const handleInsightsGenerated = insights => {
    console.log('Insights gerados:', insights)
  }

  const deleteFile = async fileId => {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      try {
        await FileService.deleteFile(fileId, router.params.id)
        state.searchResults = state.searchResults.filter(
          file => file.id !== fileId
        )
        window.showToast('Arquivo excluído com sucesso!', 'success')
      } catch (error) {
        console.error('Error deleting files:', error)
        window.showToast('Erro ao excluir arquivo', 'error')
      }
    }
  }

  const handleOpenFile = file => {
    if (file.fileLocation) {
      window.open(file.fileLocation, '_blank')
    }
  }

  const getFailedUploadsForCategory = categoryId => {
    const failedUploads = JSON.parse(
      localStorage.getItem('failedUploads') || '[]'
    )
    return failedUploads
      .filter(upload => upload.categoryId === categoryId)
      .map(upload => ({
        id: `failed-${upload.id}`,
        fileName: upload.fileName,
        fileSize: upload.fileSize,
        createdAt: upload.errorDate,
        status: 'error',
        isFailedUpload: true
      }))
  }

  const loadCategoryFiles = async () => {
    state.isLoading = true

    if (categoriesStore.categories.length === 0) {
      await categoriesStore.fetchCategories()
    }

    let categoryId = router.params.id
    if (!categoryId) {
      categoryId = localStorage.getItem('lastSelectedCategory')
      if (!categoryId && categoriesStore.categories.length > 0) {
        categoryId = categoriesStore.categories[0].id
      }
    }

    try {
      let files = []
      if (categoryId) {
        files = await FileService.getFiles(categoryId)
      }

      if (files.length === 0) {
        files = await FileService.getFilesFromAnyCategory(
          categoriesStore.categories
        )
      }

      // Adicionar arquivos com erro do localStorage
      const failedFiles = getFailedUploadsForCategory(categoryId)
      files = [...files, ...failedFiles]

      state.searchResults = files.slice(0, 5)
    } catch (error) {
      console.error('Error loading files:', error)
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

  /* .section-header h2 {
  font-size: 20px;
  margin: 0;
  font-weight: var(--font-semibold);
  color: var(--text-primary);
} */

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
