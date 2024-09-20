import { config } from 'dotenv'
import { db } from '../../database/connectionTurso.js'

config()

export class paymentsModel {
  static async getAllPayments () {
    const payment = await db.execute('SELECT * FROM payments')
    return payment.rows
  }

  static async getMovementsByDate ({ date }) {
    const query = {
      sql: 'SELECT * FROM movement WHERE date = ?',
      args: [date]
    }
    const movements = await db.execute(query)
    return movements.rows
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

  static async addMovement ({ date, description, amount, type, paymentMethod }) {
    const query = {
      sql: 'INSERT INTO movement (description, date, amount, type, payment_method) VALUES (?, ?, ?, ?, ?)',
      args: [description, date, amount, type, paymentMethod]
    }
    const movement = await db.execute(query)
    return { success: true, rows: movement.rows }
  }
}
