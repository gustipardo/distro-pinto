import cors from 'cors'

// Configurars CORS desde fuera

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'https://distro-pinto-app.vercel.app'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS', origin))
    },
    credentials: true // Permite el uso de credenciales (cookies, autorizaciones HTTP, etc.)
  })
