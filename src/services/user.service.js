import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_BACKEND;

export const UserService = {
  getProfile() {
    return axios.get(`${API_URL}/users/profile`)
      .then(response => response.data.userInformation)
      .catch(error => {
        console.error('Error getting profile:', error.message);
        throw error;
      });
  }
};