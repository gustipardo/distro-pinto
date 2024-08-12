import express, { json } from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { sqlErrorHandler } from "./middleware/sqlErrors.js";
import { config } from "dotenv";
import { createInvoicesRouter } from "./routes/invoices.js";
import { createUsersRouter } from "./routes/users.js";
import { createEntitiesRouter } from "./routes/entities.js";
import { createPaymentsRouter } from "./routes/payments.js";
import { errorHandler } from "./middleware/errorHandler.js";

config();

export const createApp = ({ invoicesModel, usersModel, entitiesModel, paymentsModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());

  app.disable("x-powered-by");

  app.use("/invoices", createInvoicesRouter({ invoicesModel }));
  app.use("/users", createUsersRouter({ usersModel }));
  app.use("/entities", createEntitiesRouter({ entitiesModel }));
  app.use("/payments", createPaymentsRouter({ paymentsModel }));

  // Manejo de errores de SQL
  app.use(sqlErrorHandler);
  app.use(errorHandler);

  // Middleware global de manejo de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  });

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
