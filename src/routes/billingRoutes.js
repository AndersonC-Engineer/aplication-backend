// src/routes/billingRoutes.js
// Rutas protegidas para administrar facturación.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getBillings,
  getBilling,
  createBilling,
  updateBilling,
  deleteBilling,
} = require('../controllers/billingsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getBillings);
router.get('/:id', [param('id').isInt()], validateRequest, getBilling);
router.post(
  '/',
  [
    body('customer_id').isInt(),
    body('user_id').isInt(),
    body('payment_method_id').isInt(),
    body('total_paid').isFloat({ min: 0 }),
    body('payment_status').isString().notEmpty(),
  ],
  validateRequest,
  createBilling
);
router.put('/:id', [param('id').isInt()], validateRequest, updateBilling);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteBilling);

module.exports = router;
