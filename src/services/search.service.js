import axios from '@/utils/httpClient'
import { processFile, filterHighProbabilityFiles } from '../utils/fileUtils'

const API_URL = import.meta.env.VITE_API_BACKEND

export const SearchService = {
  ask(query, top_k = 10) {
    return axios
      .post(`${API_URL}/ask`, {
        question: query,
        top_k: top_k
      })
      .then(response => {
        const data = response.data

        if (data.files && Array.isArray(data.files)) {
          data.files = filterHighProbabilityFiles(
            data.files.map(file => processFile(file))
          )
        }

        return data
      })
      .catch(error => {
        console.error('Query error:', error.response?.data || error.message)
        throw error
      })
  }
}
