import axios from '@/utils/httpClient';
import { processFile, filterHighProbabilityFiles } from '../utils/fileUtils';
import { sanitizeForLog } from '../utils/security';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';

const API_URL = import.meta.env.VITE_API_BACKEND;

export const FileService = {
  formatCategory(category) {
    return category.toLowerCase().replace(/\s+/g, '_');
  },
  getFiles(categoryId) {
    console.log(categoryId);
    return axios.get(`${API_URL}/documents/${categoryId}`)
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        console.log('Files loaded:', sanitizeForLog(response.data?.length || 0))
        return response.data;
      }
      return response.data || [];
    })
    .catch(error => {
      console.error('Error getting files:', sanitizeForLog(error.message));
      return [];
    });
  },
  upload(files, categoryId) {
    if (!categoryId) {
      throw new Error('Categoria é obrigatória para o upload');
    }

    const formData = new FormData();
        
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    return axios.post(`${API_URL}/documents/process`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Category-Id': categoryId
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Upload error:', sanitizeForLog(error.message));
      throw error;
    });
  },
  getCategories() {
    const generateColor = () => CATEGORY_COLORS[Math.floor(Math.random() * CATEGORY_COLORS.length)];
    const generateIcon = () => CATEGORY_ICONS[Math.floor(Math.random() * CATEGORY_ICONS.length)];
    const generateFileCount = () => Math.floor(Math.random() * 50) + 1;
    
    return axios.get(`${API_URL}/categories`)
      .then(response => {
        return response.data.map(category => ({
          ...category,
          color: generateColor(),
          icon: generateIcon(),
          fileCount: generateFileCount()
        }));
      })
      .catch(error => {
        console.error('Error getting categories:', sanitizeForLog(error.message));
        return [];
      });
  },
  createCategory(name, description) {
    return axios.post(`${API_URL}/categories`, {
      name,
      description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error creating category:', sanitizeForLog(error.message));
        throw error;
      });
  },
  deleteCategory(categoryId) {
    return axios.delete(`${API_URL}/categories/${categoryId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error deleting category:', sanitizeForLog(error.message));
        throw error;
      });
  },
}