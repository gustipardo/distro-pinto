CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    client TEXT NOT NULL,
    amount REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    payment_type TEXT CHECK(payment_type IN ('mp_Gus', 'mp_Vani', 'Cash')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices (id)
);




CREATE TABLE credit_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices (id)
);SELECT
    i.client,
    i.amount AS total_invoice_amount,
    SUM(p.amount) AS total_payment_amount,
    SUM(cn.amount) AS total_credit_note_amount,
    (i.amount - COALESCE(SUM(p.amount), 0) - COALESCE(SUM(cn.amount), 0)) AS balance
FROM
    invoices i
LEFT JOIN
    payments p ON i.id = p.invoice_id
LEFT JOIN
    credit_notes cn ON i.id = cn.invoice_id
GROUP BY
    i.client, i.amount;


-- Factura 1: Saldo= 1000 - 500 - 500 -100 -100= -200
INSERT INTO invoices (date, client, remit) VALUES ('2024-07-16', 'Client A', 1000.00);
INSERT INTO payments (invoice_id, amount, payment_type) VALUES (1, 500.00, 'mp_Gus');
INSERT INTO payments (invoice_id, amount, payment_type) VALUES (1, 500.00, 'Cash');
INSERT INTO credit_notes (invoice_id, amount) VALUES (1, 100.00);
INSERT INTO credit_notes (invoice_id, amount) VALUES (1, 100.00);


MORE INSERTS:
-- Factura 2: Sin pagos ni notas de crédito.  Saldo = 1500
INSERT INTO invoices (date, client, remit) VALUES ('2024-07-17', 'Client B', 1500.00);

-- Factura 3: Pagos parciales y nota de crédito. Saldo = 2000 - 1000 - 500 - 300 = 200
INSERT INTO invoices (date, client, remit) VALUES ('2024-07-18', 'Client C', 2000.00);
INSERT INTO payments (invoice_id, amount, payment_type) VALUES (3, 1000.00, 'mp_Vani');
INSERT INTO payments (invoice_id, amount, payment_type) VALUES (3, 500.00, 'Cash');
INSERT INTO credit_notes (invoice_id, amount) VALUES (3, 300.00);

-- Factura 4: Todos pagos y notas de crédito aplicados. Saldo = 1200 - 600 - 600 - 0 = 0
INSERT INTO invoices (date, client, remit) VALUES ('2024-07-19', 'Client D', 1200.00);
INSERT INTO payments (invoice_id, amount, payment_type) VALUES (4, 600.00, 'mp_Gus');
INSERT INTO payments (invoice_id, amount, payment_type) VALUES (4, 600.00, 'Cash');
INSERT INTO credit_notes (invoice_id, amount) VALUES (4, 0.00);

-- Factura 5: Solo nota de crédito.Saldo = 800 - 100 = 700
INSERT INTO invoices (date, client, remit) VALUES ('2024-07-20', 'Client E', 800.00);
INSERT INTO credit_notes (invoice_id, amount) VALUES (5, 100.00);



SELECT i.client, i.amount FROM invoices i WHERE id=1;


Consulta para Obtener el Saldo Actual de una Factura
    SELECT
        i.client,
        i.amount AS total_invoice_amount,
        COALESCE(p.total_payment_amount, 0) AS total_payment_amount,
        COALESCE(cn.total_credit_note_amount, 0) AS total_credit_note_amount,
        (i.amount - COALESCE(p.total_payment_amount, 0) - COALESCE(cn.total_credit_note_amount, 0)) AS balance
    FROM
        invoices i
    LEFT JOIN
        (SELECT invoice_id, SUM(amount) AS total_payment_amount
        FROM payments
        GROUP BY invoice_id) p ON i.id = p.invoice_id
    LEFT JOIN
        (SELECT invoice_id, SUM(amount) AS total_credit_note_amount
        FROM credit_notes
        GROUP BY invoice_id) cn ON i.id = cn.invoice_id
    GROUP BY
        i.client, i.amount;


Nota de credito total por cliente
    SELECT
        i.client,
        SUM(cn.amount)
    FROM
        invoices i
    LEFT JOIN
        credit_notes cn ON i.id = cn.invoice_id
    GROUP BY
        i.client;

Total facturado en un dia:
    SELECT 