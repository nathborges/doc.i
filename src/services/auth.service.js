import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BACKEND || 'http://localhost:3000/api';

let inMemoryToken = null;

export const AuthService = {
  login(username, password) { 
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    return axios.post(`${API_URL}/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        const token = response.data.access_token || '';
        inMemoryToken = token;
        localStorage.setItem('user', username);
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
    return localStorage.getItem('isAuthenticated') === 'true' && inMemoryToken !== null;
  },
  checkAuth() {
    if (this.isAuthenticated()) {
      const token = inMemoryToken;
      
      if (token) {
        this.setAuthHeader(token);
        
        return axios.get(`${API_URL}/validate-token`)
          .then(response => {
            if (response.data.valid === true) {
              return true;
            }
            return false;
          })
          .catch(error => {
            this.logout();
            return false;
          });
      }
    }
    
    return Promise.resolve(false);
  },
  
  logout() {
    inMemoryToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    delete axios.defaults.headers.common['Authorization'];
  }
}
