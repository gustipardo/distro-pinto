import { Router } from 'express'
import { EntitiesController } from '../controllers/entities.js'

export const createEntitiesRouter = ({ entitiesModel }) => {
  const EntitiesRouter = Router()
  const entitiesController = new EntitiesController({ entitiesModel })

  EntitiesRouter.get('/', entitiesController.getAllEntities)

  EntitiesRouter.post('/', entitiesController.addEntity)

  EntitiesRouter.get('/:id', entitiesController.getEntityById)

  EntitiesRouter.put('/:id', entitiesController.updateEntityById)

  return EntitiesRouter
}
