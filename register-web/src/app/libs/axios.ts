import axios from 'axios'
import { toast } from 'react-toastify'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_URL_PREFIX_V1}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    toast.error(error.response?.data.message || "Erro ao processar a requisição")
    if (error.response?.status === 401) {
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('accessToken')
      }

      if (typeof window !== 'undefined' && window.location) {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default api 