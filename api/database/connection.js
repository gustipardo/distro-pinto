import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import sqlite3 from 'sqlite3'
import { promisify } from 'util'

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = resolve(__dirname, '../database/distribuidora-dev.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error on open database:', err.message)
  } else {
    console.log('Connection successful to database SQLite3')
  }
})

// Promisify the db.all method
db.allAsync = promisify(db.all)

db.closeAsync = promisify(db.close)

export { db }
