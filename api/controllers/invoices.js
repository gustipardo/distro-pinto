import { validateInvoice } from "../schemas/Invoices.js";

export class InvoicesController {
  constructor({ invoicesModel }) {
    this.invoicesModel = invoicesModel;
  }

  getInvoices = async (req, res) => {
    const { from, to } = req.query;
    try {
      let invoices;
      if (from) {
        invoices = await this.invoicesModel.getInvoicesByDate(from, to);
      } else {
        invoices = await this.invoicesModel.getAllInvoices();
      }
      res.json(invoices);
    } catch (err) {
      console.log("Error getting invoices:", err.message);
      res.status(500).send("Error getting invoices");
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
