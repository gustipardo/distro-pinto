import { validateLogin, validateRegister } from '../schemas/Autentication.js'
import jwt from 'jsonwebtoken'

export class UsersController {
  constructor ({ usersModel }) {
    this.usersModel = usersModel
  }

  getAllUsers = async (req, res) => {
    const { user } = req.session
    if (!user) return res.status(403).send('Access not authorized')
    try {
      const users = await this.usersModel.getAllUsers()
      res.json(users)
    } catch (err) {
      console.log('Error getting users:', err.message)
      res.status(500).send('Error getting users')
    }
  }

  getUserById = async (req, res) => {
    const { user } = req.session
    if (!user) return res.status(403).send('Access not authorized')
    try {
      const { id } = req.params
      const user = await this.usersModel.getUserById(id)
      res.json(user)
    } catch (err) {
      console.log('Error getting user by id:', err.message)
      res.status(500).send('Error getting user by id')
    }
  }

  login = async (req, res) => {
    const validationResult = validateLogin(req.body)
    if (!validationResult.success) {
      const errorMessages = validationResult.errors.map(error => error.message)
      return res.status(400).json({ errors: errorMessages })
    }

    try {
      const { username, password } = req.body
      const user = await this.usersModel.login({ username, password })

      // Generar accessToken
      const accessToken = jwt.sign({ user }, process.env.SECRET_JWT_KEY, {
        expiresIn: '1h'
      })

      // Generar refreshToken
      const refreshToken = jwt.sign({ user }, process.env.SECRET_JWT_KEY, {
        expiresIn: '7d'
      })

      res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 // 1 hora
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 días
        })
        .send({ user, accessToken })
    } catch (err) {
      console.log('Error logging in:', err.message)
      res.status(500).send('Error logging in')
    }
  }

  logout = async (req, res) => {
    console.log('Logout request received')
    res
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .json({ message: 'Logout' })
  }

  register = async (req, res) => {
    const validationResult = validateRegister(req.body)
    if (!validationResult.success) {
      const errorMessages = validationResult.errors.map(error => error.message)
      return res.status(400).json({ errors: errorMessages })
    }

    try {
      const { username, password, roleId } = req.body
      const id = await this.usersModel.register({ username, password, roleId })
      res.send({ id })
    } catch (err) {
      console.log('Error registering:', err.message)
      res.status(500).send('Error registering')
    }
  }

  refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res.status(401).send('Refresh token not provided')
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.SECRET_JWT_KEY)
      const user = decoded.user

      // Generar un nuevo accessToken
      const newAccessToken = jwt.sign({ user }, process.env.SECRET_JWT_KEY, {
        expiresIn: '1h'
      })

      res
        .cookie('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 // 1 hora
        })
        .send({ accessToken: newAccessToken })
    } catch (err) {
      console.log('Error refreshing access token:', err.message)
      res.status(403).send('Invalid refresh token')
    }
  }
}
