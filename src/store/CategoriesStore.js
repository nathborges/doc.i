import { ref, reactive } from 'vue'
import { FileService } from '@/services/files.service'

// Estado reativo para as categorias
const categories = ref([])
const isLoading = ref(false)
const error = ref(null)

// Função para carregar categorias da API
const fetchCategories = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const data = await FileService.getCategorias()
    categories.value = data
    return data
  } catch (err) {
    error.value = 'Erro ao carregar categorias'
    console.error('Erro ao carregar categorias:', err)
    return []
  } finally {
    isLoading.value = false
  }
}

// Função para obter uma categoria pelo nome
const getCategoryByName = (name) => {
  return categories.value.find(cat => cat.name === name) || null
}

// Função para obter uma cor pelo nome da categoria
const getColorByName = (name) => {
  const category = getCategoryByName(name)
  return category ? category.color : '#808080' // Cinza como cor padrão
}

// Exporta a store como um objeto com estado e métodos
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