import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BACKEND || 'http://localhost:3000/api';

export const AuthService = {
  login(username, password) { 
    return axios.post(`${API_URL}/login`, {
      email: username,
      password: password
    })
      .then(response => {
        const token = response.data.access_token || '';
        localStorage.setItem('user', username);
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');
        this.setAuthHeader(token);
        return response.data;
      })
      .catch(error => {
        console.error('Erro de autenticação:', error.response?.data || error.message);
        throw error;
      });
  },
  
  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return localStorage.getItem('isAuthenticated') === 'true' && token !== null;
  },
  checkAuth() {
    const storedToken = localStorage.getItem('token');
    if (localStorage.getItem('isAuthenticated') === 'true' && storedToken !== null) {
      const token = storedToken;
      
      if (token) {
        this.setAuthHeader(token);
        
        return axios.get(`${API_URL}/validate-token`)
          .then(response => {
            if (response.data.valid === true) {
              return true;
            }
            this.logout();
            return false;
          })
          .catch(error => {
            this.logout();
            return false;
          });
      }
    }
    
    return false;
  },

  logout() {
    inMemoryToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    delete axios.defaults.headers.common['Authorization'];
  }
}
