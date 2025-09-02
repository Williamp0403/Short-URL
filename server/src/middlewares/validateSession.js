import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const validateSession = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'No hay token, acceso denegado.' })

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token inválido.' })
    req.user = user
    next()
  })
}