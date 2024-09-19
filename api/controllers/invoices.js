import { validateAddInvoiceToRoadmap, validateAddInvoiceToRoadmapBYDate, validateInvoice, validateRoadmap } from '../schemas/Invoices.js'

export class InvoicesController {
  constructor ({ invoicesModel }) {
    this.invoicesModel = invoicesModel
  }

  getInvoices = async (req, res) => {
    const { from, to, isClient, isPending, isPaid, entityId } = req.query
    const isClientBoolean = isClient === 'true'
    const isPendingBoolean = isPending === 'true'
    const isPaidBoolean = isPaid === 'true'

    const entityType = isClientBoolean ? 'customer' : 'supplier'

    let status
    if (isPendingBoolean && isPaidBoolean) {
      status = 'pending,paid'
    } else if (isPendingBoolean) {
      status = 'pending'
    } else if (isPaidBoolean) {
      status = 'paid'
    }

    try {
      const invoices = await this.invoicesModel.getInvoicesByParams(from, to, entityType, status, entityId)
      res.json(invoices)
    } catch (err) {
      console.log('Error getting invoices:', err.message)
      res.status(500).send('Error getting invoices')
    }
  }

  getInvoicesById = async (req, res) => {
    const { invoiceId } = req.params

    try {
      const invoices = await this.invoicesModel.getInvoicesById(invoiceId)
      res.json(invoices)
    } catch (err) {
      console.log('Error getting invoice:', err.message)
      res.status(500).send('Error getting invoice')
    }
  }

  getInvoicesByRoadmapDate = async (req, res) => {
    const { date } = req.params

    try {
      const roadmapId = await this.invoicesModel.getRoadmapByDate(date)
      const invoices = await this.invoicesModel.getInvoicesByRoadmapId(roadmapId)
      res.json(invoices)
    } catch (err) {
      console.log('Error getting invoices by roadmap date:', err.message)
      res.status(500).send('Error getting invoices by roadmap date')
    }
  }

  addInvoice = async (req, res) => {
    const validationResult = validateInvoice(req.body)
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors })
    }

    try {
      const { date, entityId, total } = req.body
      const invoice = await this.invoicesModel.addInvoice({ date, entityId, total })
      res.status(200).json({ message: 'Invoice added', invoice })
    } catch (err) {
      console.log('Error adding invoice:', err.message)
      res.status(500).send('Error adding invoice')
    }
  }

  getPendingInvoicesFromSuppliers = async (req, res) => {
    try {
      const invoices = await this.invoicesModel.getPendingInvoicesFromSuppliers()
      res.json(invoices)
    } catch (err) {
      console.log('Error getting pending invoices from suppliers:', err.message)
      res.status(500).send('Error getting pending invoices from suppliers')
    }
  }

  addRoadmap = async (req, res) => {
    const validationResult = validateRoadmap(req.body)
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors })
    }

    try {
      const { date } = req.body
      const roadmap = await this.invoicesModel.addRoadmap({ date })
      res.status(200).json({ message: 'Roadmap added', roadmap })
    } catch (err) {
      console.log('Error adding roadmap:', err.message)
      res.status(500).send('Error adding roadmap')
    }
  }

  addInvoiceToRoadmap = async (req, res) => {
    const validationResult = validateAddInvoiceToRoadmap(req.body)
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors })
    }

    try {
      const { invoiceId, roadmapId } = req.body
      const roadmap = await this.invoicesModel.addInvoiceToRoadmap({ invoiceId, roadmapId })
      res.status(200).json({ message: 'Invoice added to roadmap', roadmap })
    } catch (err) {
      console.log('Error adding invoice to roadmap:', err.message)
      res.status(500).send('Error adding invoice to roadmap')
    }
  }

  addInvoiceToRoadmapByDate = async (req, res) => {
    const validationResult = validateAddInvoiceToRoadmapBYDate(req.body)
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors })
    }

    try {
      const { invoiceId, roadmapDate } = req.body
      const roadmapId = await this.invoicesModel.getRoadmapByDate(roadmapDate)
      const roadmap = await this.invoicesModel.addInvoiceToRoadmap({ invoiceId, roadmapId })
      res.status(200).json({ message: 'Invoice added to roadmap', roadmap })
    } catch (err) {
      console.log('Error adding invoice to roadmap:', err.message)
      res.status(500).send('Error adding invoice to roadmap')
    }
  }
}
