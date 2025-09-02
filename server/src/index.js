import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import RouteLink from './routes/link.route.js'
import RouteAuth from './routes/auth.route.js'

if (process.env.NODE_ENV !== 'production') {
  process.loadEnvFile()
}

const app = express()
const PORT = process.env.PORT ?? 3003

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  credentials: true
}))

app.use(RouteLink)
app.use(RouteAuth)

app.get('/', (req, res) => {
  res.send('Servidor corriendo')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})