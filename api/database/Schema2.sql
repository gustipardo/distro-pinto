-- Crear tablas
CREATE TABLE entities (
  id INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  type VARCHAR NOT NULL CHECK (type IN ('customer', 'supplier'))
);

CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  entity_id,
  date DATE,
  total DECIMAL(10, 2),
  credit_note DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR DEFAULT 'pending',
  FOREIGN KEY (entity_id) REFERENCES entities(id)
);

CREATE TABLE payments (
  id INTEGER PRIMARY KEY,
  invoice_id INTEGER,
  date DATE,
  amount DECIMAL(10, 2),
  type VARCHAR CHECK (type IN ('income', 'expense')),
  payment_method VARCHAR CHECK (payment_method IN ('cash', 'mp_vani', 'mp_gus')),
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

CREATE TABLE action_history (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  action VARCHAR,
  description VARCHAR,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name VARCHAR NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE movement (
  id INTEGER PRIMARY KEY,
  description TEXT,
  date DATE,
  amount DECIMAL(10, 2),
  type VARCHAR CHECK (type IN ('income', 'expense')),
  payment_method VARCHAR CHECK (payment_method IN ('cash', 'mp_vani', 'mp_gus'))
);

CREATE TABLE roadmap (
  id INTEGER PRIMARY KEY,
  date DATE NOT NULL UNIQUE
);

CREATE TABLE roadmap_invoices (
  roadmap_id INTEGER,
  invoice_id INTEGER,
  FOREIGN KEY (roadmap_id) REFERENCES roadmap(id),
  FOREIGN KEY (invoice_id) REFERENCES invoices(id),
  PRIMARY KEY (roadmap_id, invoice_id)
);


-- Insertar datos en `users`
INSERT INTO users (id, name, role) VALUES (1, 'Vanina', 'admin');

-- Insertar datos en `entities`
INSERT INTO entities (id, name, type) VALUES 
(1, 'Customer1', 'customer'), 
(2, 'Customer2', 'customer'),
(3, 'Felfort', 'supplier'),
(4, 'Farmacia', 'supplier');

-- Insertar datos en `invoices`
INSERT INTO invoices (id, entity_id, date, total, credit_note, status) VALUES
(1, 1, '2024-06-26', 1000.00, 0.00, 'pending'),
(2, 1, '2024-06-26', 2000.00, 0.00, 'pending'),
(3, 2, '2024-06-26', 3000.00, 0.00, 'pending'),
(4, 3, '2024-07-25', 412441.22, 0.00, 'pending'),
(5, 4, '2024-07-25', 258108.84, 0.00, 'pending'),
(6, 2, '2024-07-25', 100000.00, 0.00, 'pending');

-- Insertar datos en `payments`
INSERT INTO payments (id, invoice_id, date, amount, type, payment_method) VALUES
(1, 1, '2024-07-26', 1000.00, 'income', 'cash'),  -- Pago completo en efectivo
(2, 2, '2024-07-26', 1500.00, 'income', 'mp_vani'),  -- Pago parcial con mp_vani
(3, 2, '2024-07-26', 500.00, 'income', 'mp_vani'),  -- Pago adicional con mp_vani
(4, 4, '2024-07-26', 200000.00, 'income', 'mp_gus'),  -- Pago parcial con mp_gus
(5, 5, '2024-07-26', 50000, 'income', 'cash'),  -- Pago parcial en efectivo
(6, 5, '2024-07-26', 50000, 'income', 'mp_vani');  -- Segundo pago parcial que completa el total



SELECT
  i.id AS "ID",
  i.date AS "Fecha",
  e.name AS "Cliente",
  i.total AS "Monto",
  COALESCE(SUM(CASE WHEN p.payment_method = 'cash' THEN p.amount ELSE 0 END), 0) AS "Pagado en Efectivo",
  COALESCE(SUM(CASE WHEN p.payment_method = 'mp_vani' THEN p.amount ELSE 0 END), 0) AS "Pagado en MP Vani",
  COALESCE(SUM(CASE WHEN p.payment_method = 'mp_gus' THEN p.amount ELSE 0 END), 0) AS "Pagado en MP Gus"
FROM invoices i
JOIN entities e ON i.entity_id = e.id
LEFT JOIN payments p ON i.id = p.invoice_id
GROUP BY i.id, i.date, e.name, i.total
ORDER BY i.date, i.id;



-- Facturas pendientes:
SELECT
  i.id AS invoice_id,
  e.name AS supplier_name,
  i.total AS invoice_total,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  (i.total - COALESCE(SUM(p.amount), 0)) AS remaining_amount
FROM invoices i
JOIN entities e ON i.entity_id = e.id
LEFT JOIN payments p ON i.id = p.invoice_id
WHERE e.type = 'supplier' AND i.status = 'pending'
GROUP BY i.id, e.name, i.total
HAVING remaining_amount > 0;



SELECT
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


-- No reflejado en producción
INSERT INTO roles (role_name, description) VALUES
  ('administrator', 'User with administrative privileges'),
  ('delivery_person', 'User responsible for delivering products'),
  ('sales_person', 'User responsible for taking orders and selling products in stores');


INSERT INTO movement (description, date, amount, type, payment_method)
VALUES ('Compra de suministros', '2024-08-08', 5000, 'expense', 'cash');

INSERT INTO movement (description, date, amount, type, payment_method)
VALUES ('Venta de producto A', '2024-08-08', 1740, 'income', 'mp_vani');

INSERT INTO movement (description, date, amount, type, payment_method)
VALUES ('Pago de alquiler', '2024-08-09', 125000, 'expense', 'cash');

INSERT INTO movement (description, date, amount, type, payment_method)
VALUES ('Ingreso de cliente B', '2024-08-10', 1000000, 'income', 'mp_gus');

INSERT INTO movement (description, date, amount, type, payment_method)
VALUES ('Compra de insumos', '2024-08-12', 1000, 'expense', 'cash');

INSERT INTO movement (description, date, amount, type, payment_method)
VALUES ('Servicio técnico', '2024-08-15', 9999, 'expense', 'mp_vani');


INSERT INTO roadmap (date)
VALUES ('2024-08-15');      

-- Asociamos movimientos al roadmap (ID 1)
INSERT INTO roadmap_movements (roadmap_id, movement_id)
VALUES (1, 1), (1, 2), (1, 3);

-- Asociamos facturas al roadmap (ID 1)
INSERT INTO roadmap_invoices (roadmap_id, invoice_id)
VALUES (1, 1), (1, 2), (1, 3), (1, 5), (1, 9);

SELECT 
  i.id AS invoice_id,
  i.entity_id,
  i.date AS invoice_date,
  i.total AS invoice_total,
  i.credit_note,
  i.status
FROM roadmap r
JOIN roadmap_invoices ri ON r.id = ri.roadmap_id
JOIN invoices i ON ri.invoice_id = i.id
WHERE r.id = 1; -- Reemplaza con el ID de la hoja de ruta que quieras consultar


SELECT * FROM movement WHERE type = 'income' AND date = '2024-08-08';

SELECT * FROM movement WHERE type = 'expense' AND date = '2024-08-09';

SELECT p.*
FROM payments p
JOIN invoices i ON p.invoice_id = i.id
JOIN entities e ON i.entity_id = e.id
WHERE e.type = 'supplier' AND p.date = 'YYYY-MM-DD';


SELECT p.*
FROM payments p
JOIN invoices i ON p.invoice_id = i.id
JOIN roadmap_invoices ri ON i.id = ri.invoice_id
JOIN roadmap r ON ri.roadmap_id = r.id
WHERE p.date = '2024-08-15';

INSERT INTO payments ( invoice_id, date, amount, type, payment_method) VALUES
( 5, '2024-09-17', 11.00, 'income', 'cash');


SELECT *
FROM payments
WHERE invoice_id = 5 AND date = '2024-09-17';
