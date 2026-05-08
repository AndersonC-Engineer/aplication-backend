// src/middleware/zodValidation.js
// Middleware para validación con Zod
const validateWithZod = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }
  };
};

module.exports = validateWithZod;
