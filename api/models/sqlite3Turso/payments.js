import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'

config()
export class paymentsModel {
  static async getAllPayments () {
    try {
      const payment = await db.execute('SELECT * FROM payments')
      return payment.rows
    } catch (err) {
      throw err
    }
  }

  static async getPaymentsByInvoiceId (invoice_id) {
    try {
      const query = `
        SELECT * FROM payments WHERE invoice_id = ?
      `
      const payments = await db.execute({ sql: query, args: [invoice_id] })
      return payments.rows
    } catch (err) {
      throw err
    }
  }

  static async addPayment ({ invoice_id, date, amount, payment_method, type }) {
    const query = 'INSERT INTO payments (invoice_id, date, amount, payment_method, type ) VALUES (?, ?, ?, ?, ?)'

    try {
      const payment = await db.execute({ sql: query, args: [invoice_id, date, amount, payment_method, type] })
      return { success: true, rows: payment.rows }
    } catch (err) {
      throw err
    }
  }
}
