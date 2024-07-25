import { config } from "dotenv";
import { db } from "../../database/connectionTurso.js";
 
config();

export class invoicesModel {
  static async getAllInvoices() {
    try {
      const invoices = await db.execute("SELECT * FROM invoices");
      return invoices.rows;
    } catch (err) {
      throw err;
    }
  }

  static async addInvoice({ date, client, amount }) {
    try {
      const invoice = await db.execute({ sql: "INSERT INTO invoices (date, client, amount) VALUES (?, ?, ?)",
      args: [date, client, amount] });
      return invoice.rows;
    } catch (err) {
      throw err;
    }
  }

  static async getInvoicesByDate(date) {
    try {
      const invoices = await db.execute({
        sql: "SELECT * FROM invoices WHERE date = ?",
        args: [date],
      });
      return invoices.rows;
    } catch (err) {
      throw err;
    }
  }
}