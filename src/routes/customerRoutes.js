// src/routes/customerRoutes.js
// Rutas protegidas para administrar clientes.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getCustomers,
  getCustomer,
  getCustomerBookings,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customersController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getCustomers);
router.get('/:id/bookings', [param('id').isInt()], validateRequest, getCustomerBookings);
router.get('/:id', [param('id').isInt()], validateRequest, getCustomer);
router.post(
  '/',
  [
    body('tax_id').isString().notEmpty(),
    body('full_name').isString().notEmpty(),
    body('phone_number').isString().notEmpty(),
    body('member_since').optional().isISO8601(),
    body('credit_limit').optional().isFloat({ min: 0 }),
    body('outstanding_balance').optional().isFloat({ min: 0 }),
  ],
  validateRequest,
  createCustomer
);
router.put('/:id', [param('id').isInt()], validateRequest, updateCustomer);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteCustomer);

module.exports = router;
