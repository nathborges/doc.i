import { ref } from 'vue'
import { FileService } from '@/services/files.service'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/constants'

const categories = ref([])
const selectedCategory = ref(null)
const isLoading = ref(false)
const error = ref(null)

const categoryCache = new Map()

const generateFileCount = () => Math.floor(Math.random() * 10) + 1

const getBackgroundColor = color => {
  const categoryColor = CATEGORY_COLORS.find(c => c.item === color)
  return categoryColor ? categoryColor.background : '#808080'
}

const getIconColor = color => {
  return color ? color : '#000000'
}

const getIconName = iconName => {
  return CATEGORY_ICONS.includes(iconName) ? iconName : 'folder'
}

const setSelectedCategory = categoryName => {
  if (!categoryName) {
    selectedCategory.value = null
    return
  }

  const category = categories.value.find(
    cat =>
      cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
  )

  selectedCategory.value = category || null
}

const fetchCategories = async () => {
  error.value = null

  try {
    isLoading.value = true
    const data = await FileService.getCategories()

    const categoryFormatted = data.map(each => {
      const iconColor = getIconColor(each.color)
      const backgroundColor = getBackgroundColor(each.color)
      const iconNameFormatted = getIconName(each.iconName)

      return {
        ...each,
        fileCount: generateFileCount(),
        backgroundColor,
        iconColor,
        iconName: iconNameFormatted
      }
    })

    categories.value = categoryFormatted || []

    categoryCache.clear()
    if (categoryFormatted && Array.isArray(categoryFormatted)) {
      categoryFormatted.forEach(cat => {
        if (cat.id) {
          categoryCache.set(cat.id, cat)
        }
      })
    }

    await countAllFilesPerCategory()
    isLoading.value = false

    return categoryFormatted
  } catch (err) {
    error.value = 'Erro ao carregar categorias'
    console.error('Erro ao carregar categorias:', err)
    return []
  }
}

const getCategoryById = id => {
  return categoryCache.get(id) || null
}

const getCategoryByName = name => {
  return categoryCache.get(name) || null
}

const getAllCategories = () => {
  return categoryCache
}

const deleteCategory = async categoryId => {
  if (!categoryId) throw new Error('ID da categoria é obrigatório')

  try {
    await FileService.deleteCategory(categoryId)
    categories.value = categories.value.filter(cat => cat.id !== categoryId)
    categoryCache.delete(categoryId)
    return true
  } catch (error) {
    console.error('Erro ao excluir categoria:', error)
    throw error
  }
}

const countAllFilesPerCategory = async () => {
  const fileCounts = {}

  for (const category of categories.value) {
    const categoryId = category.id
    const files = await FileService.getFiles(categoryId)
    fileCounts[categoryId] = files.length

    const cachedCategory = categoryCache.get(categoryId)
    if (cachedCategory) {
      cachedCategory.fileCount = files.length
      categoryCache.set(categoryId, cachedCategory)
    }
  }
}

export const useCategoriesStore = () => {
  return {
    categoryCache,
    categories,
    selectedCategory,
    isLoading,
    error,
    fetchCategories,
    getCategoryById,
    getCategoryByName,
    setSelectedCategory,
    deleteCategory
  }
}
