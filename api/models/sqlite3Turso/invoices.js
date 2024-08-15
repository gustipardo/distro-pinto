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

  static async addInvoice({ date, entity_id, total }) {
    try {
      const invoice = await db.execute({ sql: "INSERT INTO invoices (date, entity_id, total) VALUES (?, ?, ?)",
      args: [date, entity_id, total] });
      return invoice.rows;
    } catch (err) {
      throw err;
    }
  }

  static async getInvoicesByParams(from, to = null, entityType, status, entityId = null) {
    try {
      // Si 'to' no se proporciona, establece 'to' igual a 'from'
      if (!to && from) {
        to = from;
      }
    
      // Construir la consulta SQL con la cláusula de estado
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
      `;
    
      // Agregar la condición de fecha a la consulta si 'from' está definido
      const params = [entityType];
      if (from) {
        query += " AND i.date BETWEEN ? AND ?";
        params.push(from);
        params.push(to || from);
      }
    
      // Agregar la condición de estado a la consulta si es necesario
      if (status === 'pending') {
        query += " AND i.status = 'pending'";
      } else if (status === 'paid') {
        query += " AND i.status = 'paid'";
      }
    
      // Agregar la condición de entityId si se proporciona
      if (entityId) {
        query += " AND i.entity_id = ?";
        params.push(parseInt(entityId));
      }

      query += `
        GROUP BY i.id, i.date, e.name, i.total
        ORDER BY i.date, i.id;
      `;
      // Ejecuta la consulta con los parámetros
      const invoices = await db.execute({sql: query, args: params});
      return invoices.rows;
    } catch (err) {
      throw err;
    }
  }
  

  static async getPendingInvoicesFromSuppliers() {
    try {
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

      `;
      const invoices = await db.execute(query);
      return invoices.rows;
    } catch (err) {
      throw err;
    }
  }
}