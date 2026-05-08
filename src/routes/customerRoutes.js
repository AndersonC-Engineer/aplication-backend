// src/routes/customerRoutes.js
// Rutas protegidas para administrar clientes.
const express = require('express');
const { param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const validateWithZod = require('../middleware/zodValidation');
const { createCustomerSchema, updateCustomerSchema } = require('../utils/validationSchemas');
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
router.post('/', validateWithZod(createCustomerSchema), createCustomer);
router.put('/:id', [param('id').isInt()], validateRequest, validateWithZod(updateCustomerSchema), updateCustomer);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteCustomer);

module.exports = router;
