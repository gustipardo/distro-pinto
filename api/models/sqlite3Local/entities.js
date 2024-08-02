import { db } from "../../database/connection.js";

export class entitiesModel {

    static async getAllEntities() {
        try {
            const entities = await db.allAsync("SELECT * FROM entities");
            return entities;
        } catch (err) {
            throw err;
        }
    }

    static async addEntity({ name, type }) {
        try {
        const entity = await db.allAsync("INSERT INTO entities (name, type) VALUES (?, ?)", [name, type]);
          return entity;
        } catch (err) {
          throw err;
        }
      }
    
    static async getEntityById(id) {
        try {
          const entity = await db.allAsync("SELECT * FROM entities WHERE id = ?", id);
          return entity;
        } catch (err) {
          throw err;
        }
      }

    static async updateEntityById({id, name, type }) {
        try {
          const entity = await db.allAsync("UPDATE entities SET name = ?, type = ? WHERE id = ?", [name, type, id]);
          return entity;
        } catch (err) {
          throw err;
        }
      }

    static async getAllCustomers() {
        try {
            const entities = await db.allAsync("SELECT * FROM entities WHERE type = 'customer'");
            return entities;
        } catch (err) {
            throw err;
        }
    }

    static async getAllSuppliers() {
        try {
            const entities = await db.allAsync("SELECT * FROM entities WHERE type = 'supplier'");
            return entities;
        } catch (err) {
            throw err;
        }
    }


}