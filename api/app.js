import express, { json } from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { config } from "dotenv";
import { createInvoicesRouter } from "./routes/invoices.js";
import { db } from "./database/connection.js";

config();

export const createApp = ({ invoicesModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");

  app.use("/invoices", createInvoicesRouter({ invoicesModel }));


  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
