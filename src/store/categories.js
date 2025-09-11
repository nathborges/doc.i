import { defineStore } from 'pinia'
import { FileService } from '@/services/files.service'
import { CATEGORY_COLORS } from '@/constants'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
    selectedCategoryId: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getCategoryById: state => id => {
      return state.categories.find(cat => cat.id === id) || null
    },

    selectedCategoryColor: state => {
      const category = state.categories.find(
        cat => cat.id === state.selectedCategoryId
      )
      return category?.color || null
    },

    selectedCategoryIconColor: state => {
      const category = state.categories.find(
        cat => cat.id === state.selectedCategoryId
      )
      return category?.iconColor || null
    }
  },

  actions: {
    getBackgroundColor(color) {
      const categoryColor = CATEGORY_COLORS.find(c => c.item === color)
      return categoryColor ? categoryColor.background : '#808080'
    },
    async fetchCategories() {
      this.isLoading = true
      try {
        const data = await FileService.getCategories()
        // Buscar contagem real de arquivos
        const fileCounts = await FileService.getFileCountsForCategories(data)

        this.categories = data.map(category => ({
          ...category,
          backgroundColor: this.getBackgroundColor(category.color),
          fileCount: fileCounts[category.id] || 0
        }))
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },

    setSelectedCategory(categoryId) {
      this.selectedCategoryId = categoryId
    },

    async deleteCategory(categoryId) {
      try {
        await FileService.deleteCategory(categoryId)
        this.categories = this.categories.filter(cat => cat.id !== categoryId)
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
})
