import axios from '@/utils/httpClient';
import { isAxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const handleError = (error: any, context: string) => {
  console.error(`${context} error:`, error);

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        throw new Error(message || 'Dados de upload inválidos');
      case 401:
        throw new Error('Não autorizado');
      case 403:
        throw new Error('Acesso negado');
      case 413:
        throw new Error('Arquivos muito grandes');
      case 415:
        throw new Error('Tipo de arquivo não suportado');
      case 500:
        throw new Error('Erro interno do servidor');
      default:
        throw new Error('Erro de conexão');
    }
  }

  throw error;
};

export const DocumentsService = {
  async uploadDocuments(file: File, categoryId: string) {
    try {
      if (!categoryId?.trim()) throw new Error('ID da categoria é obrigatório');
      if (!API_URL) throw new Error('API URL não configurada');

      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/jpg',
        'image/png',
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Tipo de arquivo ${file.name} não permitido`);
      }

      const formData = new FormData();
      formData.append('files', file);

      const response = await axios.post(`${API_URL}/documents/process`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Category-Id': categoryId.trim(),
        },
      });

      if (!response?.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return response.data;
    } catch (error) {
      handleError(error, 'Upload documents');
    }
  },
};
