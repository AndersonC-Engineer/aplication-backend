// src/routes/bookingRoutes.js
// Rutas protegidas para administrar reservas.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getBookings);
router.get('/:id', [param('id').isInt()], validateRequest, getBooking);
router.post(
  '/',
  [
    body('customer_id').isInt(),
    body('court_id').isInt(),
    body('user_id').isInt(),
    body('booking_date').isISO8601(),
    body('start_time').matches(/^\d{2}:\d{2}:\d{2}$/),
    body('end_time').matches(/^\d{2}:\d{2}:\d{2}$/),
    body('total_amount').isFloat({ min: 0 }),
    body('payment_status').isString().notEmpty(),
  ],
  validateRequest,
  createBooking
);
router.put('/:id', [param('id').isInt()], validateRequest, updateBooking);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteBooking);

module.exports = router;
