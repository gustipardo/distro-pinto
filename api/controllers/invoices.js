import { validateInvoice } from "../schemas/Invoices.js";

export class InvoicesController {
  constructor({ invoicesModel }) {
    this.invoicesModel = invoicesModel;
  }

  getInvoices = async (req, res) => {
    const { date } = req.query;
    try {
      let invoices;
      if (date) {
        invoices = await this.invoicesModel.getInvoicesByDate(date);
      } else {
        invoices = await this.invoicesModel.getAllInvoices();
      }
      res.json(invoices);
    } catch (err) {
      console.log("Error getting payments:", err.message);
      res.status(500).send("Error getting payments");
    }
  };
  
  addInvoice = async (req, res) => {
    const validationResult = validateInvoice(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors });
    }

    try {
      const { date, entity_id, total } = req.body;
      const invoice = await this.invoicesModel.addInvoice({ date, entity_id, total });
      res.status(200).json({ message: "Invoice added", invoice });
        } catch (err) {
      console.log("Error adding invoice:", err.message);
      res.status(500).send("Error adding invoice");
    }
  };
  getPendingInvoicesFromSuppliers = async (req, res) => {
    try {
      const invoices = await this.invoicesModel.getPendingInvoicesFromSuppliers();
      res.json(invoices);
    } catch (err) {
      console.log("Error getting pending invoices from suppliers:", err.message);
      res.status(500).send("Error getting pending invoices from suppliers");
    }
  };

}
