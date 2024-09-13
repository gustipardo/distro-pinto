import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'

config()

export class entitiesModel {
  static async getAllEntities () {
    const entities = await db.execute('SELECT * FROM entities')
    return entities.rows
  }

  static async addEntity ({ name, type }) {
    const query = 'INSERT INTO entities (name, type) VALUES (?, ?)'
    const result = await db.execute({ sql: query, args: [name, type] })
    return result.rows
  }

  static async getEntityById (id) {
    const result = await db.execute('SELECT * FROM entities WHERE id = ?', [id])
    return result.rows
  }

  static async updateEntityById ({ id, name, type }) {
    const query = 'UPDATE entities SET name = ?, type = ? WHERE id = ?'
    const result = await db.execute({ sql: query, args: [name, type, id] })
    return result.rows
  }

  static async getAllCustomers () {
    const result = await db.execute("SELECT * FROM entities WHERE type = 'customer'")
    return result.rows
  }

  static async getAllSuppliers () {
    const result = await db.execute("SELECT * FROM entities WHERE type = 'supplier'")
    return result.rows
  }

  static async getCustomerByName (name) {
    const result = await db.execute({ sql: 'SELECT * FROM entities WHERE type = "customer" AND name LIKE ?', args: [`%${name}%`]})
    return result.rows
  }

}
