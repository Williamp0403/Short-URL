import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
  withCredentials: true
})

// Interceptores opcionales (para manejar errores globales, auth headers, etc.)
// instance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       // Manejar token expirado
//     }
//     return Promise.reject(error)
//   }
// )

export default instance