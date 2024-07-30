
export class EntitiesController {
    constructor({ entitiesModel }) {
      this.entitiesModel = entitiesModel;
    }
  
    getAllEntities = async (req, res) => {
      try {
        const entities = await this.entitiesModel.getAllEntities();
        res.json(entities);
      } catch (err) {
        console.log("Error getting entity:", err.message);
        res.status(500).send("Error getting entity");
      }
    }

    addEntity = async (req, res) => {
      try {
        const { name, type } = req.body;
        const entity = await this.entitiesModel.addEntity({ name, type });
        res.json(entity);
      } catch (err) {
        console.log("Error adding entity:", err.message);
        res.status(500).send("Error adding entity");
      }
    }

    getEntityById = async (req, res) => {
      try {
        const { id } = req.params;
        const user = await this.entitiesModel.getEntityById(id);
        res.json(user);
      } catch (err) {
        console.log("Error getting entity by id:", err.message);
        res.status(500).send("Error getting entity by id");
      }
    }

    updateEntityById = async (req, res) => {
      try {
        const { id } = req.params;
        const { name, type } = req.body;
        const entity = await this.entitiesModel.updateEntityById({id, name, type });
        res.json(entity);
      } catch (err) {
        console.log("Error updating entity by id:", err.message);
        res.status(500).send("Error updating entity by id");
      }
    }

    getAllCustomers = async (req, res) => {
      try {
        const customers = await this.entitiesModel.getAllCustomers();
        res.json(customers);
      } catch (err) {
        console.log("Error getting customers:", err.message);
        res.status(500).send("Error getting customers");
      }
    }
  }
  