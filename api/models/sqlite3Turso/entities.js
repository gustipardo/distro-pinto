import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'

config()
export class entitiesModel {
  static async getAllEntities () {
    try {
      const entities = await db.execute('SELECT * FROM entities')
      return entities.rows
    } catch (err) {
      throw err
    }
  }

  static async addEntity ({ name, type }) {
    try {
      const query = 'INSERT INTO entities (NAME, TYPE) VALUES (?, ?)'
      const entity = await db.execute({ sql: query, args: [name, type] })
      return entity.rows
    } catch (err) {
      throw err
    }
  }

  static async getEntityById (id) {
    try {
      const entity = await db.execute('SELECT * FROM entities WHERE id = ?', id)
      return entity
    } catch (err) {
      throw err
    }
  }

  static async updateEntityById ({ id, name, type }) {
    try {
      const entity = await db.execute('UPDATE entities SET name = ?, type = ? WHERE id = ?', [name, type, id])
      return entity
    } catch (err) {
      throw err
    }
  }

  static async getAllCustomers () {
    try {
      const entities = await db.execute("SELECT * FROM entities WHERE type = 'customer'")
      return entities.rows
    } catch (err) {
      throw err
    }
  }

  static async getAllSuppliers () {
    try {
      const entities = await db.execute("SELECT * FROM entities WHERE type = 'supplier'")
      return entities.rows
    } catch (err) {
      throw err
    }
  }
}
