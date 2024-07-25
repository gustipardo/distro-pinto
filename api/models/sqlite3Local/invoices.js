import { db } from "../../database/connection.js";

export class invoicesModel {
  static async getAllInvoices() {
    try {
      const invoices = await db.allAsync("SELECT * FROM invoices");
      return invoices;
    } catch (err) {
      throw err;
    }
  }

  static async addInvoice({ date, client, amount }) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO invoices (date, client, amount) VALUES (?, ?, ?)",
          [date, client, amount],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id: this.lastID }); // `this.lastID` gives the ID of the inserted row
            }
          }
        );
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getInvoicesByDate(date) {
    try {
      const invoices = await db.allAsync("SELECT * FROM invoices WHERE date = ?", [date]);
      return invoices;
    } catch (err) {
      throw err;
    }
  }
}