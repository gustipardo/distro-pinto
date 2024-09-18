import { Router } from 'express'
import { InvoicesController } from '../controllers/invoices.js'

export const createInvoicesRouter = ({ invoicesModel }) => {
  const InvoicesRouter = Router()
  const invoicesController = new InvoicesController({ invoicesModel })

  InvoicesRouter.get('/', invoicesController.getInvoices)

  InvoicesRouter.get('/pending-suppliers', invoicesController.getPendingInvoicesFromSuppliers)

  InvoicesRouter.get('/roadmap/date/:date', invoicesController.getInvoicesByRoadmapDate)

  InvoicesRouter.post('/', invoicesController.addInvoice)

  InvoicesRouter.post('/roadmap', invoicesController.addRoadmap)

  InvoicesRouter.post('/roadmap/related', invoicesController.addInvoiceToRoadmap)

  InvoicesRouter.post('/roadmap/relatedByDate', invoicesController.addInvoiceToRoadmapByDate)

  return InvoicesRouter
}
