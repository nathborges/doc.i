import axios from '@/utils/httpClient';
import { sanitizeForLog } from '../utils/security';

const API_URL = import.meta.env.VITE_API_BACKEND || 'https://doc-i-backend-sd55w5k3ga-uc.a.run.app/doc-i';

export const FileService = {
  formatCategory(category) {
    return category.toLowerCase().replace(/\s+/g, '_');
  },
  getFiles(categoryId) {
    console.log('Getting files for category:', categoryId);
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
    console.log('Upload params:', { filesCount: files.length, categoryId });
    
    if (!categoryId) {
      throw new Error('Categoria é obrigatória para o upload');
    }

    const formData = new FormData();
    
    files.forEach((file, index) => {
      console.log(`Adding file ${index}:`, file.name, file.type, file.size);
      formData.append('file', file);
    });

    console.log('Uploading to:', `${API_URL}/documents/process`);
    console.log('Category ID:', categoryId);

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
    console.log('Fetching categories from:', `${API_URL}/categories`);
    return axios.get(`${API_URL}/categories`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error('Error getting categories:', sanitizeForLog(error.message));
        return [];
      });
  },
  createCategory(name, description, iconName, color) {
    return axios.post(`${API_URL}/categories`, {
      name,
      description,
      iconName,
      color,
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