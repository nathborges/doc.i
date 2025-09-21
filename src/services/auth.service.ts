import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  init() {
    const storedToken = localStorage.getItem('token');
    if (storedToken && localStorage.getItem('isAuthenticated') === 'true') {
      this.setAuthHeader(storedToken);
    }
  },

  async login(email: string, password: string) {
    try {
      if (!email || !email.trim()) {
        throw new Error('Email é obrigatório');
      }
      if (!password || !password.trim()) {
        throw new Error('Senha é obrigatória');
      }
      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

      delete axios.defaults.headers.common['Authorization'];

      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (!response || !response.data || !response.data.accessToken) {
        throw new Error('Resposta inválida do servidor');
      }

      const token = response.data.accessToken;
      localStorage.setItem('user', email.trim());
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      this.setAuthHeader(token);

      return response.data;
    } catch (error) {
      console.error('Authentication error:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Email ou senha incorretos');
        } else if (error.response?.status === 500) {
          throw new Error('Erro interno do servidor');
        }
      }

      throw error;
    }
  },

  setAuthHeader(token: string) {
    if (!token || !token.trim()) {
      throw new Error('Token inválido');
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.trim()}`;
  },

  async checkAuth() {
    try {
      const storedToken = localStorage.getItem('token');
      if (!localStorage.getItem('isAuthenticated') || !storedToken) {
        return false;
      }

      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

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
      if (!userData.name || !userData.name.trim()) {
        throw new Error('Nome é obrigatório');
      }
      if (!userData.email || !userData.email.trim()) {
        throw new Error('Email é obrigatório');
      }
      if (!userData.password || !userData.password.trim()) {
        throw new Error('Senha é obrigatória');
      }
      if (!userData.code || !userData.code.trim()) {
        throw new Error('Código é obrigatório');
      }
      if (!API_URL) {
        throw new Error('API URL não configurada');
      }

      const sanitizedData = {
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password.trim(),
        code: userData.code.trim(),
      };

      const response = await axios.post(`${API_URL}/users`, sanitizedData);

      if (!response || !response.data) {
        throw new Error('Resposta inválida do servidor');
      }

      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Dados do usuário inválidos');
        } else if (error.response?.status === 409) {
          throw new Error('Email já está em uso');
        } else if (error.response?.status === 500) {
          throw new Error('Erro interno do servidor');
        }
      }

      throw error;
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
