import { createApp } from "./app.js";
import { invoicesModel } from "./models/sqlite3Local/invoices.js";
import { usersModel } from "./models/sqlite3Local/users.js";
import { entitiesModel } from "./models/sqlite3Local/entities.js";
import { paymentsModel } from "./models/sqlite3Local/payments.js";

const app  = createApp({ invoicesModel, usersModel, entitiesModel, paymentsModel });

export default app;
