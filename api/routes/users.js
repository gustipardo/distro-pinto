import { Router } from 'express'
import { UsersController } from '../controllers/users.js'

export const createUsersRouter = ({ usersModel }) => {
  const UsersRouter = Router()
  const usersController = new UsersController({ usersModel })

  UsersRouter.get('/', usersController.getAllUsers)

  UsersRouter.post('/', usersController.addUser)

  UsersRouter.get('/:id', usersController.getUserById)

  return UsersRouter
}
