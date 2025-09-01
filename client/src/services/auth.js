import api from './api'
 
export const login = async ({ data }) => {
  return await api.post('/auth/login', data)
}

export const register = async ({ data }) => {
  return await api.post('/auth/register', data)
} 

export const logout = async () => {
  return await api.post('/auth/logout')
}

export const validateAuthentication = async () => {
  return await api.get('/auth/validate-authentication')
}