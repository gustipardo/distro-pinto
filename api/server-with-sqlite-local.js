import { createApp } from "./app.js";
import { invoicesModel } from "./models/sqlite3Local/invoices.js"
import { usersModel } from "./models/sqlite3Local/users.js"
createApp({ invoicesModel, usersModel });
