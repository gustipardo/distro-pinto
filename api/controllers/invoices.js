
export class InvoicesController {
  constructor({ invoicesModel }) {
    this.invoicesModel = invoicesModel;
  }

  getInvoices = async (req, res) => {
    try {
      const topics = await this.invoicesModel.getAllInvoices();
      res.json(topics);
    } catch (err) {
      console.log("Error getting invoices:", err.message);
      res.status(500).send("Error getting invoices");
    }
  };

}
