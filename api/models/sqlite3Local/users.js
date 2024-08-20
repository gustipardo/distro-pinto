import { db } from '../../database/connection.js'

export class usersModel {
  static async getAllUsers () {
    try {
      const user = await db.allAsync('SELECT * FROM users')
      return user
    } catch (err) {
      throw err
    }
  }

  static async addUser ({ name, role }) {
    try {
      const user = await db.allAsync('INSERT INTO users (name, role) VALUES (?, ?)', [name, role])
      return user
    } catch (err) {
      throw err
    }
  }

  static async getUserById (id) {
    try {
      const user = await db.allAsync('SELECT * FROM users WHERE id = ?', id)
      return user
    } catch (err) {
      throw err
    }
  }
}
