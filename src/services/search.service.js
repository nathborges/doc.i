import axios from 'axios';
import { processFile } from '../utils/fileUtils';

const API_URL = import.meta.env.VITE_API_BACKEND_ASK || 'http://0.0.0.0:8004';

export const SearchService = {
  ask(query, top_k = 10) { 
    return axios.post(`${API_URL}/ask`, {
      question: query,
      top_k: top_k
    })
      .then(response => {
        const data = response.data;
        console.log(data.files)
        
        if (data.files && Array.isArray(data.files)) {
          // Process files
          data.files = data.files.map(file => processFile(file));
        }
        
        return data;
      })
      .catch(error => {
        console.error('Erro na consulta:', error.response?.data || error.message);
        throw error;
      });
  },
}
