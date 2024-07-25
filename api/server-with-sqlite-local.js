import { createApp } from "./app.js";
import { invoicesModel } from "./models/sqlite3/invoicesLocal.js";

createApp({ invoicesModel });
