import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL;

export const CategoriesService = {
  async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  async deleteCategory(id: string) {
    try {
      const response = await axios.delete(`${API_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  async getDocumentsByCategory(categoryId: string) {
    try {
      const response = await axios.get(`${API_URL}/documents/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  },
};
