import { config } from "dotenv";
// Aca tiene que ser SQLite3 Local o  puede ser tanto local como production?
import {db} from "../../database/connection.js";

config();

export class invoicesModel {
  static async getAllInvoices() {
    try {
      const invoices = await db.allAsync("SELECT * FROM invoices");
      return invoices;
    } catch (err) {
      throw err;
    }
  }
}