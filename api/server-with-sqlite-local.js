import { createApp } from "./app.js";
import { invoicesModel } from "./models/sqlite3Local/invoices.js";
import { usersModel } from "./models/sqlite3Local/users.js";
import { entitiesModel } from "./models/sqlite3Local/entities.js";
import { paymentsModel } from "./models/sqlite3Local/payments.js";

export const {app, server}  = createApp({ invoicesModel, usersModel, entitiesModel, paymentsModel });

