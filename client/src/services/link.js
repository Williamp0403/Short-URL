import api from './api'

export const createLink = async ({ long_url, name = '' }) => {
  const data = { long_url, name }
  const res = await api.post('/link', data)
  return res.data.link
}

export const getLinks = async () => {
  const res = await api.get('/links')
  return res.data.links
}

export const getLinkStatistics = async (id_link) => {
  const res = await api.get(`/link/${id_link}`)
  return res.data.link
}

export const deleteLink = async ({ id }) => {
  const res = await api.delete(`/link/${id}`)
  return res.data.id_link
} 

export const dashboardSummary = async () => {
  const res = await api.get("/links/dashboard/summary")
  return res.data.summary
}

export const dashboardTechSummary = async () => {
  const res = await api.get('/links/dashboard/tech-summary')
  return res.data.response
}