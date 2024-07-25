import { createApp } from "./app.js";
import { invoicesModel } from "./models/sqlite3/invoicesTurso.js";

createApp({ invoicesModel });
