import { createApp } from "./app.js";
import { invoicesModel } from "./models/local-file-system/invoices.js";

createApp({ invoicesModel });
