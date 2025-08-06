import axios from 'axios';
import { processFile, filterHighProbabilityFiles } from '../utils/fileUtils';

const API_URL = import.meta.env.VITE_API_BACKEND_FILE || 'http://localhost:3000/api';

export const FileService = {
  formatCategory(category) {
    return category.toLowerCase().replace(/\s+/g, '_');
  },
  getFiles(category = null) {
    const token = localStorage.getItem('token');
    let url = `${API_URL}/upload/files/`;

    if (category) {
      const formattedCategory = this.formatCategory(category);
      url += `?category=${formattedCategory}`;
    }
    
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        console.log(response.data)
        const processedFiles = response.data.map(file => processFile(file));
        return filterHighProbabilityFiles(processedFiles);
      }
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching files:', error.response?.data || error.message);
      throw error;
    });
  },
  upload(files) {
    const formData = new FormData();
        
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    const token = localStorage.getItem('token');

    return axios.post(`${API_URL}/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Upload error:', error.response?.data || error.message);
      throw error;
    });
  },
  generateRandomColor() {
    const colorTags = [
      '#1A5276', '#154360', '#0E6655', '#186A3B', '#7D3C98', '#6C3483', '#A93226', '#922B21',
      '#873600', '#784212', '#283747', '#212F3D', '#17202A', '#641E16', '#512E5F', '#1B4F72',
      '#0B5345', '#7E5109', '#4A235A', '#1B2631'
    ];
    
    return colorTags[Math.floor(Math.random() * colorTags.length)];
  },  
  getCategories() {
    return axios.get(`${API_URL}/categories`)
      .then(response => {
        return [
          { color: this.generateRandomColor(), name: "Invoices" },
          { color: this.generateRandomColor(), name: "Contracts" },
          { color: this.generateRandomColor(), name: "Coupons" },
          { color: this.generateRandomColor(), name: "Documents" }
        ];
      })
      .catch(error => {
        console.error('Error fetching categories:', error.response?.data || error.message);
        return [
          { color: this.generateRandomColor(), name: "Invoices" },
          { color: this.generateRandomColor(), name: "Contracts" },
          { color: this.generateRandomColor(), name: "Coupons" },
          { color: this.generateRandomColor(), name: "Documents" }
        ];
      });
  },
}
