import { db } from '../../database/connection.js'

export class entitiesModel {
  static async getAllEntities () {
    const entities = await db.allAsync('SELECT * FROM entities')
    return entities
  }

  static async addEntity ({ name, type }) {
    const entity = await db.allAsync('INSERT INTO entities (name, type) VALUES (?, ?)', [name, type])
    return entity
  }

  static async getEntityById (id) {
    const entity = await db.allAsync('SELECT * FROM entities WHERE id = ?', [id])
    return entity
  }

  static async updateEntityById ({ id, name, type }) {
    const entity = await db.allAsync('UPDATE entities SET name = ?, type = ? WHERE id = ?', [name, type, id])
    return entity
  }

  static async getAllCustomers () {
    const entities = await db.allAsync("SELECT * FROM entities WHERE type = 'customer'")
    return entities
  }

  static async getAllSuppliers () {
    const entities = await db.allAsync("SELECT * FROM entities WHERE type = 'supplier'")
    return entities
  }
}
