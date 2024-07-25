
export class UsersController {
    constructor({ usersModel }) {
      this.usersModel = usersModel;
    }
  
    getAllUsers = async (req, res) => {
      try {
        const users = await this.usersModel.getAllUsers();
        res.json(users);
      } catch (err) {
        console.log("Error getting invoices:", err.message);
        res.status(500).send("Error getting invoices");
      }
    };
  
  }
  