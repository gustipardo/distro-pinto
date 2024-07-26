import { Router } from 'express';
import { InvoicesController } from '../controllers/invoices.js';

export const createInvoicesRouter = ({ invoicesModel }) => {
  const InvoicesRouter = Router();
  const invoicesController = new InvoicesController({ invoicesModel });

  InvoicesRouter.get('/', invoicesController.getInvoices);

  InvoicesRouter.post('/', invoicesController.addInvoice);

  return InvoicesRouter;
};
