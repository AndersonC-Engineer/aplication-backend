// src/routes/paymentMethodRoutes.js
// Rutas protegidas para administrar métodos de pago.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getPaymentMethods,
  getPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = require('../controllers/paymentMethodsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getPaymentMethods);
router.get('/:id', [param('id').isInt()], validateRequest, getPaymentMethod);
router.post(
  '/',
  [body('method_name').isString().notEmpty(), body('is_active').isBoolean()],
  validateRequest,
  createPaymentMethod
);
router.put('/:id', [param('id').isInt()], validateRequest, updatePaymentMethod);
router.delete('/:id', [param('id').isInt()], validateRequest, deletePaymentMethod);

module.exports = router;
