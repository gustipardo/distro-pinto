export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err)

  // Si no es un error previsto, lo manejamos aquí
  res.status(500).json({ error: 'An unexpected error occurred' })
}
