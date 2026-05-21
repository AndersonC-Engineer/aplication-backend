// src/middleware/errorHandler.js
// Manejador centralizado de errores para capturar errores de Express y devolver respuestas JSON.
const notFound = (req, res, _next) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error('Global error handler:', err);

  const response = {
    message: 'Ocurrió un error al procesar la solicitud',
  };

  let status = 500;

  if (err.code) {
    switch (err.code) {
      case '23505':
        status = 409;
        response.message = 'Ya existe un registro con valores duplicados';
        break;
      case '23503':
        status = 400;
        response.message = 'Violación de clave foránea. Revisa los IDs relacionados.';
        break;
      case '23502':
        status = 400;
        response.message = `Falta un valor obligatorio ${err.column ? `para ${err.column}` : ''}`;
        break;
      case '22P02':
        status = 400;
        response.message = 'Formato inválido para el tipo de dato esperado.';
        break;
      case '23514':
        status = 400;
        response.message = 'Violación de restricción CHECK en la base de datos.';
        break;
      default:
        break;
    }
  }

  if (err.name === 'ZodError') {
    status = 400;
    response.message = 'Datos de entrada inválidos';
    response.errors = err.errors.map((errorItem) => ({
      field: errorItem.path.length ? errorItem.path.join('.') : 'body',
      message: errorItem.message,
    }));
  }

  if (err.status && Number.isInteger(err.status)) {
    status = err.status;
  }

  if (process.env.NODE_ENV !== 'production' && err.message) {
    response.details = err.message;
  }

  return res.status(status).json(response);
};

module.exports = {
  notFound,
  errorHandler,
};
