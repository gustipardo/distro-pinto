import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'
import bcrypt from 'bcrypt'

config()

export class usersModel {
  static async getAllUsers () {
    const query = `
    SELECT 
      users.id, 
      users.username, 
      roles.role_name 
    FROM users 
    JOIN roles ON users.role_id = roles.id
  `
    const user = await db.execute(query)
    return user.rows
  }

  static async getAllRoles () {
    const query = `
      SELECT * FROM roles 
    `
    const roles = await db.execute(query)
    return roles.rows
  }

  static async getUserById (id) {
    const query = 'SELECT * FROM users WHERE id = ?'
    const user = await db.execute({ sql: query, args: [id] })
    return user.rows
  }

  static async login ({ username, password }) {
    const query = 'SELECT * FROM users JOIN roles ON users.role_id = roles.id WHERE username = ?'
    const user = await db.execute({ sql: query, args: [username] })
    if (user.rows.length === 0) throw new Error('User not found')

    const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password)
    if (!isPasswordCorrect) throw new Error('Incorrect password')
    const { password: _, ...publicUser } = user.rows[0]
    return publicUser
  }

  static async register ({ username, password, roleId }) {
    // Validar si el usuario existe
    const previousQuery = 'SELECT * FROM users WHERE username = ?'
    const user = await db.execute({ sql: previousQuery, args: [username] })
    if (user.rows.length > 0) throw new Error('User already exists')

    const id = crypto.randomUUID()
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    const query = 'INSERT INTO users (id, username, password, role_id) VALUES (?, ?, ?, ?)'
    await db.execute({ sql: query, args: [id, username, hashPassword, parseInt(roleId)] })
    return id
  }

  static async deleteUser ({ id }) {
    const query = 'DELETE FROM users WHERE id = ?'
    await db.execute({ sql: query, args: [id] })
    return 'User deleted'
  }
}
