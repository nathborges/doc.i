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
    const coresTag = [
      '#1A5276', // Azul marinho profundo
      '#154360', // Azul petróleo
      '#0E6655', // Verde esmeralda escuro
      '#186A3B', // Verde floresta
      '#7D3C98', // Roxo intenso
      '#6C3483', // Roxo profundo
      '#A93226', // Vermelho tijolo
      '#922B21', // Vermelho escuro
      '#873600', // Marrom escuro
      '#784212', // Marrom terra
      '#283747', // Azul ardósia profundo
      '#212F3D', // Azul-cinza escuro
      '#17202A', // Azul-preto
      '#641E16', // Borgonha
      '#512E5F', // Roxo escuro
      '#1B4F72', // Azul cobalto
      '#0B5345', // Verde musgo
      '#7E5109', // Âmbar escuro
      '#4A235A', // Roxo imperial
      '#1B2631'  // Cinza ardósia escuro
    ];
    
    return coresTag[Math.floor(Math.random() * coresTag.length)];
  },  
  getCategorias() {
    return axios.get(`${API_URL}/categorias`)
      .then(response => {
        return [{ color: this.gerarCorAleatoria(), name: "Notas fiscais" }, { color: this.gerarCorAleatoria(), name: "Serviços" }, { color: this.gerarCorAleatoria(), name: "Contratos comerciais" }];
      })
      .catch(error => {
        console.error('Erro de obter categorias:', error.response?.data || error.message);
        return [{ color: this.gerarCorAleatoria(), name: "Notas fiscais" }, { color: this.gerarCorAleatoria(), name: "Serviços" }, { color: this.gerarCorAleatoria(), name: "Contratos comerciais" }];
      });
  },
}
