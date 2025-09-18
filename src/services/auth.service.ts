import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  init() {
    const storedToken = localStorage.getItem('token');
    if (storedToken && localStorage.getItem('isAuthenticated') === 'true') {
      this.setAuthHeader(storedToken);
    }
  },
  login(email: string, password: string) {
    delete axios.defaults.headers.common['Authorization'];
    return axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem('user', email);
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');
        this.setAuthHeader(token);
        return response.data;
      })
      .catch((error) => {
        console.error('Authentication error:', error.response?.data || error.message);
        throw error;
      });
  },

  signup(name: string, email: string, password: string, code: string) {
    return axios
      .post(`${API_URL}/users`, { name, email, password, code })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Signup error:', error.response?.data || error.message);
        throw error;
      });
  },

  setAuthHeader(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  checkAuth() {
    const storedToken = localStorage.getItem('token');
    if (localStorage.getItem('isAuthenticated') === 'true' && storedToken) {
      this.setAuthHeader(storedToken);
      return axios
        .get(`${API_URL}/users/profile`)
        .then(() => true)
        .catch(() => {
          this.logout();
          return false;
        });
    }
    return Promise.resolve(false);
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    delete axios.defaults.headers.common['Authorization'];
  },
};

// Inicializa automaticamente quando o módulo é carregado
AuthService.init();
