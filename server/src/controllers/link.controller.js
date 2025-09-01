import { ModelLink } from "../models/link.model.js"

export class ControllerLink {
  static async getLinks (req, res) {
    try {
      const response = await ModelLink.requestGetLinks(req.user.id_user)
      res.json({ links: response })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }

  static async getLinkStatistics (req, res) {
    try {
      const response = await ModelLink.requestGetLinkStatistics(req.params.id)
      if(!response.success) return res.status(response.status).json({ message: response.message })
      res.json({ link: response.link })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }

  static async createLink (req, res) {
    try {
      const response = await ModelLink.requestCreateLink(req.body, req.user?.id_user || null)
      if(!response.success) return res.status(response.status).json({ message: response.message })
      res.json({ link: response.link })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }

  static async deleteLink (req, res) {
    try {
      const response = await ModelLink.requestDeleteLink(req.params.id) 
      if(!response.success) return res.status(404).json({ message: response.message })
      
      res.json({ id_link: response.id_link })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }

  static async redirectLink (req, res) {
    try {
      const response = await ModelLink.requestRedirectLink(req.params.code, req)
      if(!response.success) return res.status(response.status).json({ message: response.message })

      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      
      res.redirect(302, response.link);
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    } 
  }
  
  static async getDashboardSummary (req, res) {
    try {
      const summary = await ModelLink.requestDashboardSummary(req.user.id_user)
      res.json({ summary })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Error obteniendo datos del dashboard' })
    }
  }

  static async getDashboardTechSummary (req, res) {
    try {
      const response = await ModelLink.requestGetDashboardTechSummary(req.user.id_user)
      res.json({ response })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Error obteniendo datos del dashboard' })
    }
  }
  
}