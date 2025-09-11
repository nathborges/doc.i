<template>
  <SectionWrapper
    title="Arquivos Recentes"
    button-text="Ver todos"
    button-variant="text"
    @button-click="handleViewAll"
  >
    <FileTable
      :files="state.searchResults"
      :show-category="true"
      :show-status="false"
      :show-actions="false"
    />
  </SectionWrapper>
</template>

<script setup>
  import SectionWrapper from './SectionWrapper.vue'
  import FileTable from '../BaseFileTable.vue'
  import { useRouter } from 'vue-router'
  import { reactive, onMounted } from 'vue'
  import { useCategoriesStore } from '@/store/categories'
  import { FileService } from '@/services/files.service'

  const router = useRouter()
  const categoriesStore = useCategoriesStore()

  const state = reactive({
    searchResults: [],
    isLoading: false
  })

  const handleViewAll = () => {
    router.push({ name: 'files' })
  }

  const loadCategoryFiles = async () => {
    state.isLoading = true

    if (categoriesStore.categories.length === 0) {
      await categoriesStore.fetchCategories()
      if (categoriesStore.categories.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }

    let lastCategoryId = localStorage.getItem('lastSelectedCategory')
    if (!lastCategoryId && categoriesStore.categories.length > 0) {
      lastCategoryId = categoriesStore.categories[0].id
    }

    try {
      let files = []
      if (lastCategoryId) {
        files = await FileService.getRecentFiles(lastCategoryId)
        console.log(files)
      }

      if (files.length === 0) {
        files = await FileService.getFilesFromAnyCategory(
          categoriesStore.categories
        )
      }

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
