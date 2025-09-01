import jwt from 'jsonwebtoken'

export const attachUserIfPresent = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return next() // seguir como anónimo

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (!err) req.user = user
    next()
  })
}
