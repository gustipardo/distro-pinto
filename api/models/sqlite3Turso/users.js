import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'

config()

export class usersModel {
  static async getAllUsers () {
    const user = await db.execute('SELECT * FROM users')
    return user.rows
  }

  static async addUser ({ name, role }) {
    const query = 'INSERT INTO users (name, role) VALUES (?, ?)'
    const user = await db.execute({ sql: query, args: [name, role] })
    return user
  }

  static async getUserById (id) {
    const query = 'SELECT * FROM users WHERE id = ?'
    const user = await db.execute({ sql: query, args: [id] })
    return user.rows
  }
}
