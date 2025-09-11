import axios from '@/utils/httpClient'
import { sanitizeForLog } from '../utils/security'

const API_URL = import.meta.env.VITE_API_BACKEND

export const FileService = {
  formatCategory(category) {
    return (
      category.charAt(0).toUpperCase() +
      category.slice(1).toLowerCase().replace(/\s+/g, '_')
    )
  },
  getFiles(categoryId) {
    console.log('Getting files for category:', categoryId)
    return axios
      .get(`${API_URL}/documents/${categoryId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          console.log(
            'Files loaded:',
            sanitizeForLog(response.data?.length || 0)
          )
          return response.data
        }
        return response.data || []
      })
      .catch(error => {
        console.error('Error getting files:', sanitizeForLog(error.message))
        return []
      })
  },
  upload(file, categoryId) {
    if (!categoryId) {
      throw new Error('Categoria é obrigatória para o upload')
    }

    console.log(file)

    const formData = new FormData()

    formData.append('file', file)

    return axios
      .post(`${API_URL}/documents/process`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Category-Id': categoryId
        }
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error('Upload error:', sanitizeForLog(error.message))
        throw error
      })
  },

  async getFileCount(categoryId) {
    try {
      const files = await this.getFiles(categoryId)
      return files.length
    } catch (error) {
      console.error('Error getting file count:', error)
      return 0
    }
  },

  async getFileCountsForCategories(categories) {
    const counts = {}
    for (const category of categories) {
      counts[category.id] = await this.getFileCount(category.id)
    }
    return counts
  },
  getCategories() {
    return axios
      .get(`${API_URL}/categories`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error(
          'Error getting categories:',
          sanitizeForLog(error.message)
        )
        return []
      })
  },
  createCategory(name, description, iconName, color) {
    return axios
      .post(
        `${API_URL}/categories`,
        {
          name,
          description,
          iconName,
          color
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error('Error creating category:', sanitizeForLog(error.message))
        throw error
      })
  },
  deleteCategory(categoryId) {
    return axios
      .delete(`${API_URL}/categories/${categoryId}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error('Error deleting category:', sanitizeForLog(error.message))
        throw error
      })
  },
  deleteFile(fileId, categoryId) {
    return axios
      .delete(`${API_URL}/documents/${fileId}`, {
        headers: {
          'X-Category-Id': categoryId
        }
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error('Error deleting file:', sanitizeForLog(error.message))
        throw error
      })
  },
  async getFilesFromAnyCategory(categories) {
    console.log('Getting files from any category', categories)
    for (const category of categories) {
      console.log(`Getting files for category ${category.id}`)
      try {
        const files = await this.getRecentFiles(category.id)
        console.log(`Files for category ${category.id}:`, files)
        if (files.length > 0) {
          return files
        }
      } catch (error) {
        console.error(`Error getting files for category ${category.id}:`, error)
      }
    }
    return []
  },
  getRecentFiles(categoryId) {
    return axios
      .get(`${API_URL}/documents/${categoryId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          return response.data.map(file => ({
            ...file,
            categoryName: this.formatCategory(file.category?.name) || '',
            categoryColor: file.category?.color || ''
          }))
        }
        return response.data || []
      })
      .catch(error => {
        console.error(
          'Error getting recent files:',
          sanitizeForLog(error.message)
        )
        return []
      })
  }
}
