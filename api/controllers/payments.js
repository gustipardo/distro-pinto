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

  addPayment = async (req, res) => {
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
}
