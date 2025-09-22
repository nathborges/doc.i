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
        throw new Error(message || 'Dados inválidos');
      case 401:
        throw new Error('Email ou senha incorretos');
      case 403:
        throw new Error('Acesso negado');
      case 404:
        throw new Error('Recurso não encontrado');
      case 409:
        throw new Error('Email já está em uso');
      case 500:
        throw new Error('Erro interno do servidor');
      default:
        throw new Error('Erro de conexão');
    }
  }

  throw error;
};

export const AuthService = {
  init() {
    const storedToken = localStorage.getItem('token');
    if (storedToken && localStorage.getItem('isAuthenticated') === 'true') {
      this.setAuthHeader(storedToken);
    }
  },

  async login(email: string, password: string) {
    try {
      if (!email?.trim()) throw new Error('Email é obrigatório');
      if (!password?.trim()) throw new Error('Senha é obrigatória');
      if (!API_URL) throw new Error('API URL não configurada');

      delete axios.defaults.headers.common['Authorization'];

      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (!response?.data?.accessToken) {
        throw new Error('Resposta inválida do servidor');
      }

      const token = response.data.accessToken;
      localStorage.setItem('user', email.trim());
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      this.setAuthHeader(token);

      return response.data;
    } catch (error) {
      handleError(error, 'Authentication');
    }
  },

  setAuthHeader(token: string) {
    if (!token?.trim()) throw new Error('Token inválido');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.trim()}`;
  },

  async checkAuth() {
    try {
      const storedToken = localStorage.getItem('token');
      if (!localStorage.getItem('isAuthenticated') || !storedToken) {
        return false;
      }

      if (!API_URL) throw new Error('API URL não configurada');

      this.setAuthHeader(storedToken);
      await axios.get(`${API_URL}/users/profile`);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  async createUser(userData: { name: string; email: string; password: string; code: string }) {
    try {
      if (!userData.name?.trim()) throw new Error('Nome é obrigatório');
      if (!userData.email?.trim()) throw new Error('Email é obrigatório');
      if (!userData.password?.trim()) throw new Error('Senha é obrigatória');
      if (!userData.code?.trim()) throw new Error('Código é obrigatório');
      if (!API_URL) throw new Error('API URL não configurada');

      const sanitizedData = {
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password.trim(),
        code: userData.code.trim(),
      };

      const response = await axios.post(`${API_URL}/users`, sanitizedData);

      if (!response?.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return response.data;
    } catch (error) {
      handleError(error, 'User creation');
    }
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    delete axios.defaults.headers.common['Authorization'];
  },
};

AuthService.init();
