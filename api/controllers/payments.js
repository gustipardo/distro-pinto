export class PaymentsController {
  constructor ({ paymentsModel }) {
    this.paymentsModel = paymentsModel
  }

  getAllPayments = async (req, res) => {
    const { invoice_id } = req.query
    try {
      if (invoice_id) {
        const payments = await this.paymentsModel.getPaymentsByInvoiceId(invoice_id)
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
      const { invoice_id, date, amount, payment_method, type } = req.body
      const result = await this.paymentsModel.addPayment({ invoice_id, date, amount, payment_method, type })
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
