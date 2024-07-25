import { createApp } from "./app.js";
import { invoicesModel } from "./models/sqlite3Turso/invoices.js"

createApp({ invoicesModel });
