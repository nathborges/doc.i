import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL;

export const CategoriesService = {
  async getCategories() {
    try {
      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

      const response = await axios.get(`${API_URL}/categories`);

      if (!response || !response.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error getting categories:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return [];
        } else if (error.response?.status === 500) {
          throw new Error('Erro interno do servidor');
        }
      }

      throw error;
    }
  },

  async deleteCategory(id: string) {
    try {
      if (!id || !id.trim()) {
        throw new Error('ID da categoria é obrigatório');
      }
      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

      const response = await axios.delete(`${API_URL}/categories/${id.trim()}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Categoria não encontrada');
        } else if (error.response?.status === 500) {
          throw new Error('Erro interno do servidor');
        }
      }

      throw error;
    }
  },

  async createCategory(categoryData: {
    name: string;
    description: string;
    color: string;
    iconName: string;
  }) {
    try {
      if (!categoryData || !categoryData.name || !categoryData.name.trim()) {
        throw new Error('Nome da categoria é obrigatório');
      }
      if (!categoryData.color || !categoryData.color.trim()) {
        throw new Error('Cor da categoria é obrigatória');
      }
      if (!categoryData.iconName || !categoryData.iconName.trim()) {
        throw new Error('Ícone da categoria é obrigatório');
      }
      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

      const sanitizedData = {
        name: categoryData.name.trim(),
        description: categoryData.description?.trim() || '',
        color: categoryData.color.trim(),
        iconName: categoryData.iconName.trim(),
      };

      await axios.post(`${API_URL}/categories`, sanitizedData);

      return true;
    } catch (error) {
      console.error('Error creating category:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Dados da categoria inválidos');
        } else if (error.response?.status === 500) {
          throw new Error('Erro interno do servidor');
        }
      }

      throw error;
    }
  },

  async getDocumentsByCategory(categoryId: string) {
    try {
      if (!categoryId || !categoryId.trim()) {
        throw new Error('ID da categoria é obrigatório');
      }
      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

      const response = await axios.get(`${API_URL}/documents/${categoryId.trim()}`);

      if (!response || !response.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error getting documents:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return [];
        } else if (error.response?.status === 500) {
          throw new Error('Erro interno do servidor');
        }
      }

      throw error;
    }
  },
};
