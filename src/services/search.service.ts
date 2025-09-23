import axios from '@/utils/httpClient';
import { isAxiosError } from 'axios';
import type { SearchResponse } from '@/types/search';

const API_URL = import.meta.env.VITE_API_URL;

interface SearchRequest {
  query: string;
  limit: number;
  categoryId?: string;
}

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

export const SearchService = {
  capitalizeQuery(query: string): string {
    return query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
  },

  async search(query: string, categoryId: string | null): Promise<SearchResponse> {
    try {
      const searchData: SearchRequest = {
        query: this.capitalizeQuery(query),
        limit: 60,
      };

      if (categoryId) {
        searchData.categoryId = categoryId;
      }

      const response = await axios.post(`${API_URL}/search`, searchData);

      const { results, responseAi } = response.data;
      const fileNames = responseAi.fileNames;

      // Extract files with plainText and fileName
      const files = results
        .filter((result: any) => fileNames.includes(result.payload.fileName))
        .map((result: any) => ({
          plainText: result.payload.plainText,
          fileName: result.payload.fileName,
        }));

      return {
        answer: responseAi.answer,
        files,
      };
    } catch (error) {
      console.error('Error searching:', error);

      return {
        answer:
          'Infelizmente, devido a uma indisponibilidade não consigo responder sua pergunta no momento.',
        files: [],
      };
    }
  },
  async exportReport(fields: string, content: string): Promise<Blob> {
    try {
      if (!API_URL) throw new Error('API URL não configurada');

      const response = await axios.post(
        `${API_URL}/reports/excel`,
        {
          fields,
          content,
        },
        {
          responseType: 'blob',
        }
      );

      return response.data;
    } catch (error) {
      handleError(error, 'Export report');
      throw error;
    }
  },
};
