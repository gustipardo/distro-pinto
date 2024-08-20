import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'

config()
export class usersModel {
  static async getAllUsers () {
    try {
      const user = await db.execute('SELECT * FROM users')
      return user.rows
    } catch (err) {
      throw err
    }
  }

  static async addUser ({ name, role }) {
    try {
      const user = await db.execute('INSERT INTO users (name, role) VALUES (?, ?)', [name, role])
      return user
    } catch (err) {
      throw err
    }
  }

  static async getUserById (id) {
    try {
      const user = await db.execute('SELECT * FROM users WHERE id = ?', id)
      return user
    } catch (err) {
      throw err
    }
  }
}
