-- Crear tablas
CREATE TABLE entities (
  id INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('customer', 'supplier'))
);

CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  entity_id INTEGER,
  date DATE,
  total DECIMAL(10, 2),
  credit_note DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR,
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
  id INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL
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
