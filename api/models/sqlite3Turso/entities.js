import { config } from "dotenv";
import { db } from "../../database/connectionTurso.js";
 
config();
export class entitiesModel {

    static async getAllEntities() {
        try {
            const entities = await db.execute("SELECT * FROM entities");
            return entities.rows;
        } catch (err) {
            throw err;
        }
    }

    static async addEntity({ name, type }) {
        try {
        const entity = await db.execute("INSERT INTO entities (name, type) VALUES (?, ?)", [name, type]);
          return entity;
        } catch (err) {
          throw err;
        }
      }
    
    static async getEntityById(id) {
        try {
          const entity = await db.execute("SELECT * FROM entities WHERE id = ?", id);
          return entity;
        } catch (err) {
          throw err;
        }
      }

    static async updateEntityById({id, name, type }) {
        try {
          const entity = await db.execute("UPDATE entities SET name = ?, type = ? WHERE id = ?", [name, type, id]);
          return entity;
        } catch (err) {
          throw err;
        }
      }


}