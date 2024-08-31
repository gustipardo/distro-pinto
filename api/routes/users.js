import { Router } from 'express'
import { UsersController } from '../controllers/users.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

export const createUsersRouter = ({ usersModel }) => {
  const UsersRouter = Router()
  const usersController = new UsersController({ usersModel })

  UsersRouter.get('/refresh-token', usersController.refreshAcessToken)

  UsersRouter.get('/me', usersController.validateAccessToken)

  UsersRouter.get('/', authenticateToken, usersController.getAllUsers)

  UsersRouter.get('/:id', authenticateToken, usersController.getUserById)

  UsersRouter.post('/login', usersController.login)

  UsersRouter.post('/logout', usersController.logout)

  UsersRouter.post('/register', usersController.register)

  return UsersRouter
}
