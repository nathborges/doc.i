import axios from '@/utils/httpClient'

const API_URL = import.meta.env.VITE_API_BACKEND

export const UserService = {
  async getProfile() {
    try {
      const response = await axios.get(`${API_URL}/users/profile`)
      return response.data
    } catch (error) {
      console.error('Error getting profile:', error)
      throw error
    }
  }
}
