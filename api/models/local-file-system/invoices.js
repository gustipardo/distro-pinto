import { config } from "dotenv";
// Aca tiene que ser SQLite3 Local o  puede ser tanto local como production?
// El metodo de db de sqlite3 local no es el mismo que el de Turso, por el momento solo uso turso
/* import {db} from "../../database/connection.js"; */
import { db } from "../../database/connectionTurso.js";
 
config();

export class invoicesModel {
  static async getAllInvoices() {
    try {
      const invoices = await db.execute("SELECT * FROM invoices");
      console.log("data", invoices.rows);

      return invoices;
    } catch (err) {
      throw err;
    }
  }
}