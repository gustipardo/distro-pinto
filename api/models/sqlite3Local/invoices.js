import { db } from '../../database/connection.js'

export class invoicesModel {
  static async getAllInvoices () {
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
    `
    return db.allAsync(query)
  }

  static async addInvoice ({ date, entityId, total }) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO invoices (date, entity_id, total) VALUES (?, ?, ?)',
        [date, entityId, total],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve({ id: this.lastID }) // `this.lastID` gives the ID of the inserted row
          }
        }
      )
    })
  }

  static async getInvoicesByParams (from, to = null, entityType, status, entityId = null) {
    if (!to && from) {
      to = from
    }

    let query = `
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
      WHERE e.type = ?
    `

    const params = [entityType]
    if (from) {
      query += ' AND i.date BETWEEN ? AND ?'
      params.push(from, to || from)
    }

    if (status === 'pending') {
      query += " AND i.status = 'pending'"
    } else if (status === 'paid') {
      query += " AND i.status = 'paid'"
    }

    if (entityId) {
      query += ' AND i.entity_id = ?'
      params.push(parseInt(entityId))
    }

    query += `
      GROUP BY i.id, i.date, e.name, i.total
      ORDER BY i.date, i.id;
    `

    return db.allAsync(query, params)
  }

  static async getPendingInvoicesFromSuppliers () {
    const query = `
      SELECT
        i.id AS invoice_id,
        i.date AS invoice_date,
        e.name AS supplier_name,
        ROUND(i.total, 2) AS invoice_total,
        ROUND(COALESCE(SUM(p.amount), 0), 2) AS total_paid,
        ROUND((i.total - COALESCE(SUM(p.amount), 0)), 2) AS remaining_amount
      FROM invoices i
      JOIN entities e ON i.entity_id = e.id
      LEFT JOIN payments p ON i.id = p.invoice_id
      WHERE e.type = 'supplier' AND i.status = 'pending'
      GROUP BY i.id, e.name, i.total
      HAVING remaining_amount > 0;
    `
    return db.allAsync(query)
  }
}
