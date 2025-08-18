import axios from 'axios'
import router from '@/router'

// Interceptor para requests - adiciona token automaticamente
axios.interceptors.request.use(
  (config) => {
    // Pula o interceptor para login
    if (config.url?.includes('/auth/login')) {
      return config
    }
    
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para respostas 401
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default axios