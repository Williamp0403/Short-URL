import dotenv from 'dotenv'
dotenv.config()
import { ModelAuth } from "../models/auth.model.js"
import jwt from 'jsonwebtoken'

export class ControllerAuth {
  static async register (req, res) {
    try {
      const response = await ModelAuth.requestRegister(req.body)
      if (!response.success) return res.status(response.status).json({ message: response.message })
      res.cookie('token', response.token, {
        httpOnly: true, 
        secure: true, 
        sameSite: 'None', 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }).json({ user: response.user })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }

  static async login (req, res) {
    try {
      const response = await ModelAuth.requestLogin(req.body)
      if(!response.success) return res.status(response.status).json({ message: response.message })
      res.cookie('token', response.token, {
        httpOnly: true, 
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }).json({ user: response.user })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }

  static async logout (req, res) {
    try {
      const token = req.cookies?.token

      if (!token) return res.status(401).json({ message: 'No hay sesión activa' });
      
      res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      })
      // Opcional: Invalida el token en el modelo si usas JWT almacenado
      // await ModelAuth.invalidateToken(req.cookies.token);
      return res.status(200).json({ message: 'Sesión cerrada correctamente' })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }

  static async validateAuthentication (req, res) {
    try {
      const token = req.cookies?.token

      if(!token) return res.status(401).json({ message: 'No hay token, accesso denegado.' })

      jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Token inválido.' })

        const { id_user } = user
        const response = await ModelAuth.requestGetUser(id_user)
        if (!response.success) return res.status(401).json({ message: response.message })
        res.json({ user: response.user })

      })
      

    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en servidor' })
    }
  }
}