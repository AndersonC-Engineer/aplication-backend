// src/routes/pendingChargeRoutes.js
// Rutas protegidas para administrar cargos pendientes.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getPendingCharges,
  getPendingCharge,
  createPendingCharge,
  updatePendingCharge,
  deletePendingCharge,
} = require('../controllers/pendingChargesController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getPendingCharges);
router.get('/:id', [param('id').isInt()], validateRequest, getPendingCharge);
router.post(
  '/',
  [
    body('customer_id').isInt(),
    body('product_id').isInt(),
    body('booking_id').optional().isInt(),
    body('description').optional().isString(),
    body('quanty').isInt({ min: 1 }),
    body('unit_price').isFloat({ min: 0 }),
    body('subtotal').isFloat({ min: 0 }),
  ],
  validateRequest,
  createPendingCharge
);
router.put('/:id', [param('id').isInt()], validateRequest, updatePendingCharge);
router.delete('/:id', [param('id').isInt()], validateRequest, deletePendingCharge);

module.exports = router;
