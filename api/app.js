import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { sqlErrorHandler } from './middleware/sqlErrors.js';
import { config } from 'dotenv';
import { createInvoicesRouter } from './routes/invoices.js';
import { createUsersRouter } from './routes/users.js';
import { createEntitiesRouter } from './routes/entities.js';
import { createPaymentsRouter } from './routes/payments.js';
import { errorHandler } from './middleware/errorHandler.js';

config();

export const createApp = ({ invoicesModel, usersModel, entitiesModel, paymentsModel }) => {
  const app = express();
  app.use(express.json());
  app.use(corsMiddleware());

  app.disable('x-powered-by');

  app.use('/invoices', createInvoicesRouter({ invoicesModel }));
  app.use('/users', createUsersRouter({ usersModel }));
  app.use('/entities', createEntitiesRouter({ entitiesModel }));
  app.use('/payments', createPaymentsRouter({ paymentsModel }));

  app.get('/', (req, res) => {
    res.send('Welcome to the Distro-API!');
  });

  app.get('/health', (req, res) => {
    res.send('OK');
  });

  app.use(sqlErrorHandler);
  app.use(errorHandler);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

  const PORT = process.env.PORT ?? 1238;

  app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
  });

  return app ;
};
