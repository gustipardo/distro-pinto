import { Router } from 'express'
import { PaymentsController } from '../controllers/payments.js'

export const createPaymentsRouter = ({ paymentsModel }) => {
  const PaymentsRouter = Router()
  const paymentsController = new PaymentsController({ paymentsModel })

  PaymentsRouter.get('/', paymentsController.getAllPayments)

  PaymentsRouter.post('/', paymentsController.addPayment)

  return PaymentsRouter
}
