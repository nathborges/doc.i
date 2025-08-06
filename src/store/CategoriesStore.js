import { ref } from 'vue'
import { FileService } from '@/services/files.service'

// Reactive state for categories
const categories = ref([])
const isLoading = ref(false)
const error = ref(null)

// Function to load categories from API
const fetchCategories = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const data = await FileService.getCategories()
    categories.value = data
    return data
  } catch (err) {
    error.value = 'Error loading categories'
    console.error('Error loading categories:', err)
    return []
  } finally {
    isLoading.value = false
  }
}

// Function to get a category by name
const getCategoryByName = (name) => {
  return categories.value.find(cat => cat.name === name) || null
}

// Function to get a color by category name
const getColorByName = (name) => {
  const category = getCategoryByName(name)
  return category ? category.color : '#808080' // Gray as default color
}

// Export the store as an object with state and methods
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