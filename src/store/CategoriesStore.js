import { ref, reactive } from 'vue'
import { FileService } from '@/services/files.service'

const categories = ref([])
const isLoading = ref(false)
const error = ref(null)

const categoryCache = new Map()

const fetchCategories = async () => {
  isLoading.value = true
  error.value = null

  try {
    const data = await FileService.getCategories()
    categories.value = data || []
    
    categoryCache.clear()
    if (data && Array.isArray(data)) {
      data.forEach(cat => {
        categoryCache.set(cat.name, cat)
      })
    }

    return data
  } catch (err) {
    error.value = 'Erro ao carregar categorias'
    console.error('Erro ao carregar categorias:', err)
    return []
  } finally {
    isLoading.value = false
  }
}

const getCategoryByName = (name) => {
  return categoryCache.get(name) || null
}

const getColorByName = (name) => {
  const category = categoryCache.get(name)
  return category?.color || '#808080'
}

export const useCategoriesStore = () => {
  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    getCategoryByName,
    getColorByName
  }
}