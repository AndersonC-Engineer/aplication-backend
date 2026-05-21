// src/middleware/zodValidation.js
// Middleware para validación con Zod
const { ZodError } = require('zod');

const validateWithZod = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.errors.map((err) => ({
          field: err.path.length ? err.path.join('.') : 'body',
          message: err.message,
        }));

        return res.status(400).json({ errors });
      }

      req.body = result.data;
      return next();
    } catch (error) {
      console.error('Zod validation unexpected error:', error);

      const safeError = error instanceof ZodError
        ? { field: 'body', message: 'Datos inválidos' }
        : { field: 'body', message: 'Error de validación' };

      return res.status(400).json({ errors: [safeError] });
    }
  };
};

module.exports = validateWithZod;
