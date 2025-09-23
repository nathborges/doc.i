import type { User } from '@/types/user';
import axios from '@/utils/httpClient';
import { isAxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface ProfileResponse {
  userInformation: {
    name: string;
    email: string;
  };
  categories: any[];
  totalDocuments: string;
  totalStorageUsed: string;
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
        throw new Error('Usuário não encontrado');
      case 500:
        throw new Error('Erro interno do servidor');
      default:
        throw new Error('Erro de conexão');
    }
  }

  throw error;
};

export const UserService = {
  async getUserProfile(): Promise<User> {
    try {
      if (!API_URL) throw new Error('API URL não configurada');

      const response = await axios.get<ProfileResponse>(`${API_URL}/users/profile`);

      if (!response?.data) {
        throw new Error('Resposta inválida do servidor');
      }

      const { userInformation, totalDocuments, totalStorageUsed } = response.data;

      return {
        name: userInformation.name,
        email: userInformation.email,
        totalDocuments: totalDocuments,
        totalStorageUsed: totalStorageUsed,
      };
    } catch (error) {
      handleError(error, 'Get user profile');
      throw error;
    }
  },
};
