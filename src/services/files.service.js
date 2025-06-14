import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BACKEND_FILE || 'http://localhost:3000/api';

export const FileService = {
  upload(username, password) {
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
  gerarCorAleatoria() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(30 + Math.random() * 30);
    const lightness = Math.floor(60 + Math.random() * 20);
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  },  
  getCategorias() {
    return axios.get(`${API_URL}/categorias`)
      .then(response => {
        return [{ color: this.gerarCorAleatoria(), name: "Cantar" }, { color: this.gerarCorAleatoria(), name: "Dançar" }, { color: this.gerarCorAleatoria(), name: "Brincar" }];
      })
      .catch(error => {
        console.error('Erro de obter categorias:', error.response?.data || error.message);
        return [{ color: this.gerarCorAleatoria(), name: "Cantar" }, { color: this.gerarCorAleatoria(), name: "Dançar" }, { color: this.gerarCorAleatoria(), name: "Brincar" }];
      });
  },
}
