import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL;

export const DocumentsService = {
  async uploadDocuments(files: File[], categoryId: string) {
    try {
      if (!files || !Array.isArray(files) || files.length === 0) {
        throw new Error('Arquivos são obrigatórios');
      }
      if (!categoryId || !categoryId.trim()) {
        throw new Error('ID da categoria é obrigatório');
      }
      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

      // Validate files
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

      for (const file of files) {
        if (!file || !(file instanceof File)) {
          throw new Error('Arquivo inválido detectado');
        }
        if (file.size > maxFileSize) {
          throw new Error(`Arquivo ${file.name} excede o tamanho máximo de 10MB`);
        }
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`Tipo de arquivo ${file.name} não permitido`);
        }
      }

      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axios.post(`${API_URL}/documents/process`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Category-Id': categoryId.trim(),
        },
      });

      if (!response || !response.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return response.data;
    } catch (error) {
      console.error('Error uploading documents:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Dados de upload inválidos');
        } else if (error.response?.status === 413) {
          throw new Error('Arquivos muito grandes');
        } else if (error.response?.status === 500) {
          throw new Error('Erro interno do servidor');
        }
      }

      throw error;
    }
  },
};
