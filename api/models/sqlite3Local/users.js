import { db } from '../../database/connection.js'
import bcrypt from 'bcrypt'
import { config } from 'dotenv'

config()

export class usersModel {
  static async getAllUsers () {
    const users = await db.allAsync('SELECT * FROM users')
    return users
  }

  static async getUserById (id) {
    const query = 'SELECT * FROM users WHERE id = ?'
    const user = await db.allAsync(query, id)
    return user
  }

  static async login ({ username, password }) {
    const query = 'SELECT * FROM users WHERE username = ?'
    const user = await db.allAsync(query, [username])
    if (user.length === 0) throw new Error('User not found')

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
    if (!isPasswordCorrect) throw new Error('Incorrect password')
    const { password: _, ...publicUser } = user[0]
    return publicUser
  }

  static async register ({ username, password }) {
    // Validar si el usuario existe
    const previousQuery = 'SELECT * FROM users WHERE username = ?'
    console.log('previousQuery', username)
    const user = await db.allAsync(previousQuery, [username])
    console.log('user', user)
    if (user.length > 0) throw new Error('User already exists')

    const id = crypto.randomUUID()
    console.log('salt', process.env.SALT_ROUNDS)
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    const roleId = 4
    const query = 'INSERT INTO users (id, username, password, role_id) VALUES (?, ?, ?, ?)'
    await db.allAsync(query, [id, username, hashPassword, roleId])
    return id
  }
}
