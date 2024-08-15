import { validateInvoice } from "../schemas/Invoices.js";

export class InvoicesController {
  constructor({ invoicesModel }) {
    this.invoicesModel = invoicesModel;
  }

  getInvoices = async (req, res) => {
    const { from, to, isClient, isPending, isPaid, entityId } = req.query;
    const isClientBoolean = isClient === 'true';
    const isPendingBoolean = isPending === 'true';
    const isPaidBoolean = isPaid === 'true';
  
    const entityType = isClientBoolean ? 'customer' : 'supplier';
    
    let status;
    if (isPendingBoolean && isPaidBoolean) {
      status = 'pending,paid';
    } else if (isPendingBoolean) {
      status = 'pending';
    } else if (isPaidBoolean) {
      status = 'paid';
    }
  
    try {
      let invoices;
      invoices = await this.invoicesModel.getInvoicesByParams(from, to, entityType, status, entityId);
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
