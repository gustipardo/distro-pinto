
export class UsersController {
    constructor({ usersModel }) {
      this.usersModel = usersModel;
    }
  
    getAllUsers = async (req, res) => {
      try {
        const users = await this.usersModel.getAllUsers();
        res.json(users);
      } catch (err) {
        console.log("Error getting users:", err.message);
        res.status(500).send("Error getting users");
      }
    }

    addUser = async (req, res) => {
      try {
        const { name, role } = req.body;
        const user = await this.usersModel.addUser({ name, role });
        res.json(user);
      } catch (err) {
        console.log("Error adding user:", err.message);
        res.status(500).send("Error adding user");
      }
    }

    getUserById = async (req, res) => {
      try {
        const { id } = req.params;
        const user = await this.usersModel.getUserById(id);
        res.json(user);
      } catch (err) {
        console.log("Error getting user by id:", err.message);
        res.status(500).send("Error getting user by id");
      }
    }
  
  }
  