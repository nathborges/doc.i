import { ref, reactive } from 'vue'
import { FileService } from '@/services/files.service'

// Estado reativo para as categorias
const categories = ref([])
const isLoading = ref(false)
const error = ref(null)

// Cache para melhorar performance de buscas
const categoryCache = new Map()

// Função para carregar categorias da API
const fetchCategories = async () => {
  isLoading.value = true
  error.value = null

  try {
    const data = await FileService.getCategories()
    categories.value = data
    
    // Atualizar cache
    categoryCache.clear()
    data.forEach(cat => {
      categoryCache.set(cat.name, cat)
    })

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
  return category?.color || '#808080' // Cinza como cor padrão
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