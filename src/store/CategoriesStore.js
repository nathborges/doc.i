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

const deleteCategory = async (categoryId) => {
  try {
    await FileService.deleteCategory(categoryId)
    categories.value = categories.value.filter(cat => cat.id !== categoryId)
    
    // Atualizar cache
    for (const [name, cat] of categoryCache.entries()) {
      if (cat.id === categoryId) {
        categoryCache.delete(name)
        break
      }
    }
    
    return true
  } catch (error) {
    console.error('Erro ao excluir categoria:', error)
    throw error
  }
}

export const useCategoriesStore = () => {
  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    getCategoryByName,
    getColorByName,
    deleteCategory
  }
}