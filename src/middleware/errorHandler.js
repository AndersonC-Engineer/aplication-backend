// src/middleware/errorHandler.js
// Manejador centralizado de errores para capturar errores de Express y devolver respuestas JSON.
const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
    details: err.details || undefined,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
