import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_BACKEND || 'http://localhost:3000/api';

export const AuthService = {
  login(email, password) {
    return axios.post(`${API_URL}/auth/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const token = response.data.accessToken;
        localStorage.setItem('user', email);
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');
        this.setAuthHeader(token);
        return response.data;
      })
      .catch(error => {
        console.error('Authentication error:', error.response?.data || error.message);
        throw error;
      });
  },

  signup(name, email, password, code) {
    return axios.post('https://doc-i-backend-sd55w5k3ga-uc.a.run.app/doc-i/users', {
      name,
      email,
      password,
      code
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Signup error:', error.response?.data || error.message);
        throw error;
      });
  },

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  checkAuth() {
    const storedToken = localStorage.getItem('token');
    if (localStorage.getItem('isAuthenticated') === 'true' && storedToken !== null) {
      const token = storedToken;
    
      if (token) {
        this.setAuthHeader(token);
        
        return axios.get(`${API_URL}/users/profile`)
          .then(response => {
            return true;
          })
          .catch(error => {
            console.log("Error validating token", error)
            this.logout();
            return false;
          });
      }
    }
    
    return false;
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    delete axios.defaults.headers.common['Authorization'];
  }
}