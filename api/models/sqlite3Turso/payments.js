import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'

config()

export class paymentsModel {
  static async getAllPayments () {
    const payment = await db.execute('SELECT * FROM payments')
    return payment.rows
  }

  static async getPaymentsByInvoiceId (invoiceId) {
    const query = `
      SELECT * FROM payments WHERE invoice_id = ?
    `
    const payments = await db.execute({ sql: query, args: [invoiceId] })
    return payments.rows
  }

  static async addPayment ({ invoiceId, date, amount, paymentMethod, type }) {
    const query = 'INSERT INTO payments (invoice_id, date, amount, payment_method, type) VALUES (?, ?, ?, ?, ?)'

    const payment = await db.execute({ sql: query, args: [invoiceId, date, amount, paymentMethod, type] })
    return { success: true, rows: payment.rows }
  }
}
