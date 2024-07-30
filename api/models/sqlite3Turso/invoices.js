import { config } from "dotenv";
import { db } from "../../database/connectionTurso.js";
 
config();

export class invoicesModel {
  static async getAllInvoices() {
    try {
      const query = `
        SELECT
          i.id AS "id",
          i.date AS "date",
          e.name AS "client",
          i.total AS "amount",
          COALESCE(SUM(CASE WHEN p.payment_method = 'cash' THEN p.amount ELSE 0 END), 0) AS "cash",
          COALESCE(SUM(CASE WHEN p.payment_method = 'mp_vani' THEN p.amount ELSE 0 END), 0) AS "mp_vani",
          COALESCE(SUM(CASE WHEN p.payment_method = 'mp_gus' THEN p.amount ELSE 0 END), 0) AS "mp_gus"
        FROM invoices i
        JOIN entities e ON i.entity_id = e.id
        LEFT JOIN payments p ON i.id = p.invoice_id
        GROUP BY i.id, i.date, e.name, i.total
        ORDER BY i.date, i.id;
      `;
      const invoices = await db.execute(query);
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
      const query = `
        SELECT
          i.id AS "id",
          i.date AS "date",
          e.name AS "client",
          i.total AS "amount",
          COALESCE(SUM(CASE WHEN p.payment_method = 'cash' THEN p.amount ELSE 0 END), 0) AS "cash",
          COALESCE(SUM(CASE WHEN p.payment_method = 'mp_vani' THEN p.amount ELSE 0 END), 0) AS "mp_vani",
          COALESCE(SUM(CASE WHEN p.payment_method = 'mp_gus' THEN p.amount ELSE 0 END), 0) AS "mp_gus"
        FROM invoices i
        JOIN entities e ON i.entity_id = e.id
        LEFT JOIN payments p ON i.id = p.invoice_id
        WHERE i.date = ?
        GROUP BY i.id, i.date, e.name, i.total
        ORDER BY i.date, i.id;
      `;
      const invoices = await db.execute({ sql: query, args: [date] });
      return invoices.rows;
    } catch (err) {
      throw err;
    }
  }
}