import { createApp } from "./app.js";
import { invoicesModel } from "./models/sqlite3Local/invoices.js"
createApp({ invoicesModel });
