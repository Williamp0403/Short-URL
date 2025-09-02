import dotenv from 'dotenv'
dotenv.config()
import { sql } from "../config/db.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export class ModelAuth {
  static async requestRegister (data) {
    const { username, name, password } = data

    const [hasUser] = await sql`SELECT * FROM Users WHERE username = ${username}`

    if (hasUser) return { success: false, status: 409, message: 'El nombre de usuario ya está en uso. Por favor elige otro.' }

    const hashedPassword = await bcrypt.hash(password, 10) 

    const [user] = await sql`
      INSERT INTO Users (username, name, password) 
      VALUES (${username}, ${name}, ${hashedPassword}) RETURNING *`

    const token = jwt.sign({ id_user: user.id_user }, process.env.SECRET_TOKEN, { expiresIn: '7d' })

    return {
      success: true,
      message: 'Usuario registrado',
      token,
      user: {
        id_user: user.id_user,
        name: user.name,
        username: user.username
      }
    }
  }

  static async requestLogin (data) {
    const { username, password } = data

    const [hasUser] = await sql`SELECT * FROM Users WHERE username = ${username}`

    if(!hasUser) return { success: false, status: 404, message: 'Usuario o contraseña incorrecta.' }

    const verifyPassword = await bcrypt.compare(password, hasUser.password)

    if (!verifyPassword) return { success: false, status: 404, message: 'Usuario o contraseña incorrecta.'}

    const token = jwt.sign({ id_user: hasUser.id_user }, process.env.SECRET_TOKEN, { expiresIn: '7d' })

    return {
      success: true,
      message: 'Sesión iniciada exitosamente.',
      token: token,
      user: {
        id_user: hasUser.id_user,
        name: hasUser.name,
        username: hasUser.username
      }
    }
  }

  static async requestGetUser (id) {
    const [user] = await sql`SELECT * FROM Users WHERE id_user = ${id}`

    if(!user) return { success: false, message: 'Usuario no encontrado.' }

    return {
      success: true,
      user: {
        id_user: user.id_user,
        name: user.name,
        username: user.username
      }
    }
  }
}