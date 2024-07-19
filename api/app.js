import express, { json } from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { config } from "dotenv";
import sqlite3 from "sqlite3";
import { createInvoicesRouter } from "./routes/invoices.js";

config();

export const createApp = ({ invoicesModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");


  const db = new sqlite3.Database("database/distribuidora_dev.db", (err) => {
    if (err) {
      console.error("Error on open database:", err.message);
    } else {
      console.log("Connection successful to database SQLite3");
    }
  });

  app.use("/invoices", createInvoicesRouter({ invoicesModel }));

  app.get("/data", (req, res) => {
    const sql = "SELECT * FROM invoices";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error on query database:", err.message);
        res.status(500).json({ error: "Error on server" });
      } else {
        res.json(rows);
      }
    });
  });

  const PORT = process.env.PORT ?? 1234;



  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
