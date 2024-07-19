import { config } from "dotenv";

config();

export class invoicesModel {
  static async getAllInvoices() {
    console.log("invoicesModel.getAllTopics")
    return "invoicesModel.getAllTopics"
    }
}