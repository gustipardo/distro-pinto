import { promisify } from 'util'
import { db } from '../../database/connection.js'

export class paymentsModel {
  static async getAllPayments () {
    const payments = await db.allAsync('SELECT * FROM payments')
    return payments
  }

  static async getMovementsByDate ({ date }) {
    const query = `
    SELECT * FROM movement WHERE date = ?
  `
    const movements = await db.allAsync(query, [date])
    return movements
  }

  static async getPaymentsByInvoiceId (invoiceId) {
    const query = `
      SELECT * FROM payments WHERE invoice_id = ?
    `
    const payments = await db.allAsync(query, [invoiceId])
    return payments
  }

  static async getSupplierPaymentsByDate ({ date }) {
    const query = `
    SELECT 
      p.id AS payment_id,
      p.date AS payment_date,
      p.amount AS payment_amount,
      p.payment_method,
      i.id AS invoice_id,
      i.total AS invoice_total,
      i.date AS invoice_date,
      e.name AS supplier_name
    FROM 
      payments p
    JOIN 
      invoices i ON p.invoice_id = i.id
    JOIN 
      entities e ON i.entity_id = e.id
    WHERE 
      p.type = 'expense'
      AND p.date = ?
    `
    const payments = await db.allAsync(query, [date])
    return payments
  }

  static async getPaymentsByInvoiceIdAndDate ({ invoiceId, date }) {
    const query = `
        SELECT 
          p.id AS payment_id,
          p.date AS payment_date,
          p.amount AS payment_amount,
          p.payment_method,
          i.id AS invoice_id,
          i.total AS invoice_total,
          i.date AS invoice_date,
          e.name AS supplier_name
        FROM 
          payments p
        JOIN 
          invoices i ON p.invoice_id = i.id
        JOIN 
          entities e ON i.entity_id = e.id
        WHERE 
          p.date = ?
          AND i.id = ?
    `

    const payments = await db.allAsync(query, [date, invoiceId])
    return payments
  }

  static async addPayment ({ invoiceId, date, amount, paymentMethod, type }) {
    const runAsync = promisify(db.run).bind(db)
    const payment = await runAsync(
      'INSERT INTO payments (invoice_id, date, amount, payment_method, type) VALUES (?, ?, ?, ?, ?)',
      [invoiceId, date, amount, paymentMethod, type]
    )
    return { success: true, rows: payment }
  }

  static async addMovement ({ date, description, amount, type, paymentMethod }) {
    const runAsync = promisify(db.run).bind(db)
    const movement = await runAsync(
      'INSERT INTO movement (description, date, amount, type, payment_method) VALUES (?, ?, ?, ?, ?)',
      [description, date, amount, type, paymentMethod]
    )
    return { success: true, rows: movement }
  }
}
