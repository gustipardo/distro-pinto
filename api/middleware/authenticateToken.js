import jwt from 'jsonwebtoken'

export const authenticateToken = async (req, res, next) => {
  const accessToken = req.cookies.access_token
  const refreshToken = req.cookies.refresh_token

  if (!accessToken) {
    return res.status(401).send('Access token not provided')
  }

  try {
    // Verificar el accessToken
    jwt.verify(accessToken, process.env.SECRET_JWT_KEY)
    next() // El token es válido, continuar con la solicitud
  } catch (err) {
    if (err.name === 'TokenExpiredError' && refreshToken) {
      // El accessToken ha expirado, intentar renovarlo con el refreshToken
      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.SECRET_JWT_KEY)
        const user = decodedRefresh.user

        // Generar un nuevo accessToken
        const newAccessToken = jwt.sign({ user }, process.env.SECRET_JWT_KEY, {
          expiresIn: '1h'
        })

        // Actualizar el token en las cookies
        res.cookie('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 // 1 hora
        })

        // Reintentar la solicitud original con el nuevo token
        req.cookies.access_token = newAccessToken
        next()
      } catch (refreshErr) {
        console.error('Error refreshing access token:', refreshErr.message)
        return res.status(403).send('Invalid refresh token')
      }
    } else {
      // El token es inválido o no se pudo renovar
      console.error('Error validating access token:', err.message)
      return res.status(403).send('Invalid access token')
    }
  }
}
