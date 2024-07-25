import sqlite3 from "sqlite3";
import { promisify } from "util"; // Sirve para convertir la función de callback en promesas

const db = new sqlite3.Database("database/distribuidora-dev.db", (err) => {
  if (err) {
    console.error("Error on open database:", err.message);
  } else {
    console.log("Connection successful to database SQLite3");
  }
});

// Promisify the db.all method
db.allAsync = promisify(db.all);

export { db };
