import { Router } from 'express'
import { PaymentsController } from '../controllers/payments.js'

export const createPaymentsRouter = ({ paymentsModel }) => {
  const PaymentsRouter = Router()
  const paymentsController = new PaymentsController({ paymentsModel })

  PaymentsRouter.get('/', paymentsController.getAllPayments)

  PaymentsRouter.get('/movement/:date', paymentsController.getMovementsByDate)

  PaymentsRouter.get('/supplier/:date', paymentsController.getSupplierPaymentsByDate)

  PaymentsRouter.post('/', paymentsController.addPayment)

  PaymentsRouter.post('/movement', paymentsController.addMovement)

  return PaymentsRouter
}
