import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BACKEND_ASK || 'http://0.0.0.0:8004';

export const SearchService = {
  ask(query, top_k = 10) { 
    return axios.post(`${API_URL}/ask/`, {
      question: query,
      top_k: top_k
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Erro na consulta:', error.response?.data || error.message);
        throw error;
      });
  },
}
