import { validateMovement, validatePayment } from '../schemas/Payment.js'

export class PaymentsController {
  constructor ({ paymentsModel }) {
    this.paymentsModel = paymentsModel
  }

  getAllPayments = async (req, res) => {
    const { invoiceId } = req.query
    try {
      if (invoiceId) {
        const payments = await this.paymentsModel.getPaymentsByInvoiceId(invoiceId)
        res.json(payments)
      } else {
        const payments = await this.paymentsModel.getAllPayments()
        res.json(payments)
      }
    } catch (err) {
      console.log('Error getting payments:', err.message)
      res.status(500).send('Error getting payments')
    }
  }

  getMovementsByDate = async (req, res) => {
    const { date } = req.params
    try {
      const movements = await this.paymentsModel.getMovementsByDate({ date })

      res.json(movements)
    } catch (err) {
      console.log('Error getting movements by date:', err.message)
      res.status(500).send('Error getting movements by date')
    }
  }

  addPayment = async (req, res) => {
    const validationResult = validatePayment(req.body)
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors })
    }
    try {
      const { invoiceId, date, amount, paymentMethod, type } = req.body
      const result = await this.paymentsModel.addPayment({ invoiceId, date, amount, paymentMethod, type })
      if (result.success) {
        res.json(result)
      } else {
        res.status(500).send('Error adding payment')
      }
    } catch (err) {
      console.log('Error adding payment:', err.message)
      res.status(500).send('Error adding payment')
    }
  }

  addMovement = async (req, res) => {
    const validationResult = validateMovement(req.body)
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors })
    }
    try {
      const { date, description, amount, type, paymentMethod } = req.body
      const result = await this.paymentsModel.addMovement({ date, description, amount, type, paymentMethod })
      if (result.success) {
        res.json(result)
      } else {
        res.status(500).send('Error adding movement')
      }
    } catch (err) {
      console.log('Error adding payment:', err.message)
      res.status(500).send('Error adding movement')
    }
  }
}
