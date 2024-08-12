// middleware/sqlerrors.js

export const sqlErrorHandler = (err, req, res, next) => {
    if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: "Duplicate entry detected. Please use a unique value." });
    }
  
    // Si el error no es de tipo SQL o no es manejado específicamente aquí, pasamos al siguiente middleware de errores
    next(err);
  }
    