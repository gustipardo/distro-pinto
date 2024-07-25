import { db } from "../../database/connection.js";

export class usersModel {

  static async getAllUsers() {
    try {
      const invoices = await db.allAsync("SELECT * FROM users");
      return invoices;
    } catch (err) {
      throw err;
    }
  }

}