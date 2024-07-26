
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
      console.log("Error getting invoices:", err.message);
      res.status(500).send("Error getting invoices");
    }
  };
  addInvoice = async (req, res) => {
    try {
      const { date, client, amount } = req.body;
      const invoice = await this.invoicesModel.addInvoice({ date, client, amount });
      res.json(invoice);
    } catch (err) {
      console.log("Error adding invoice:", err.message);
      res.status(500).send("Error adding invoice");
    }
  };

}
