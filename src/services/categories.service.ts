import axios from '@/utils/httpClient';
import { isAxiosError } from 'axios';
import type { Category, CreateCategoryData, Document } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

const handleError = (error: any, context: string) => {
  console.error(`${context} error:`, error);

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        throw new Error(message || 'Dados inválidos');
      case 401:
        throw new Error('Não autorizado');
      case 403:
        throw new Error('Acesso negado');
      case 404:
        throw new Error('Recurso não encontrado');
      case 409:
        throw new Error('Conflito - recurso já existe');
      case 500:
        throw new Error('Erro interno do servidor');
      default:
        throw new Error('Erro de conexão');
    }
  }

  throw error;
};

export const CategoriesService = {
  async getCategories(): Promise<Category[]> {
    try {
      if (!API_URL) throw new Error('API URL não configurada');

      const response = await axios.get(`${API_URL}/categories`);

      if (!response?.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      handleError(error, 'Get categories');
      return [];
    }
  },

  async deleteCategory(id: string): Promise<any> {
    try {
      if (!id?.trim()) throw new Error('ID da categoria é obrigatório');
      if (!API_URL) throw new Error('API URL não configurada');

      const response = await axios.delete(`${API_URL}/categories/${id.trim()}`);
      return response.data;
    } catch (error) {
      handleError(error, 'Delete category');
    }
  },

  async createCategory(categoryData: CreateCategoryData): Promise<boolean> {
    try {
      if (!categoryData?.name?.trim()) throw new Error('Nome da categoria é obrigatório');
      if (!categoryData?.color?.trim()) throw new Error('Cor da categoria é obrigatória');
      if (!categoryData?.iconName?.trim()) throw new Error('Ícone da categoria é obrigatório');
      if (!API_URL) throw new Error('API URL não configurada');

      const sanitizedData = {
        name: categoryData.name.trim(),
        description: categoryData.description?.trim() || 'Sem descrição',
        color: categoryData.color.trim(),
        iconName: categoryData.iconName.trim(),
      };

      await axios.post(`${API_URL}/categories`, sanitizedData);
      return true;
    } catch (error) {
      handleError(error, 'Create category');
      return false;
    }
  },

  async getDocumentsByCategory(categoryId: string): Promise<Document[]> {
    try {
      if (!categoryId?.trim()) throw new Error('ID da categoria é obrigatório');
      if (!API_URL) throw new Error('API URL não configurada');

      const response = await axios.get(`${API_URL}/documents/${categoryId.trim()}`);

      if (!response?.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      handleError(error, 'Get documents by category');
      return [];
    }
  },

  async deleteDocument(documentId: string, categoryId: string): Promise<void> {
    try {
      if (!documentId?.trim()) throw new Error('ID do documento é obrigatório');
      if (!categoryId?.trim()) throw new Error('ID da categoria é obrigatório');
      if (!API_URL) throw new Error('API URL não configurada');

      await axios.delete(`${API_URL}/documents/${documentId.trim()}`, {
        headers: {
          'X-Category-Id': categoryId.trim(),
        },
      });
    } catch (error) {
      handleError(error, 'Delete document');
    }
  },
};
