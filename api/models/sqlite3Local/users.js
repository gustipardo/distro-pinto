import { db } from '../../database/connection.js'

export class usersModel {
  static async getAllUsers () {
    const users = await db.allAsync('SELECT * FROM users')
    return users
  }

  static async addUser ({ name, role }) {
    const query = 'INSERT INTO users (name, role) VALUES (?, ?)'
    const result = await db.allAsync(query, [name, role])
    return result
  }

  static async getUserById (id) {
    const query = 'SELECT * FROM users WHERE id = ?'
    const user = await db.allAsync(query, id)
    return user
  }
}
