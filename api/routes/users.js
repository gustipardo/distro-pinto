import { Router } from 'express'
import { UsersController } from '../controllers/users.js'

export const createUsersRouter = ({ usersModel }) => {
  const UsersRouter = Router()
  const usersController = new UsersController({ usersModel })

  UsersRouter.get('/refresh-token', usersController.refreshAcessToken)

  UsersRouter.get('/me', usersController.validateAccessToken)

  UsersRouter.get('/', usersController.getAllUsers)

  UsersRouter.get('/roles', usersController.getAllRoles)

  UsersRouter.get('/:id', usersController.getUserById)

  UsersRouter.post('/login', usersController.login)

  UsersRouter.post('/logout', usersController.logout)

  UsersRouter.post('/register', usersController.register)

  UsersRouter.delete('/:id', usersController.deleteUser)

  return UsersRouter
}
