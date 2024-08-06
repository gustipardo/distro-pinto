import { promisify } from "util";
import { db } from "../../database/connection.js";

export class paymentsModel {

  static async getAllPayments() {
    try {
      const user = await db.allAsync("SELECT * FROM payments");
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async getPaymentsByInvoiceId(invoice_id) {
    try {
      const query = `
        SELECT * FROM payments WHERE invoice_id = ?
      `;
      const payments = await db.allAsync(query, [invoice_id]);
      return payments;
    } catch (err) {
      throw err;
    }
  }

  static async addPayment({ invoice_id, date, amount, payment_method, type }) {
    try {
      const runAsync = promisify(db.run).bind(db);
      const payment = await runAsync(
        "INSERT INTO payments (invoice_id, date, amount, payment_method, type) VALUES (?, ?, ?, ?, ?)",
        [invoice_id, date, amount, payment_method, type]
      );
      return { success: true, rows: payment };
    } catch (err) {
      throw err;
    }
  }
}