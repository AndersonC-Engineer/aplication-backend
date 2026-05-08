// src/routes/bookingRoutes.js
// Rutas protegidas para administrar reservas.
const express = require('express');
const { param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const validateWithZod = require('../middleware/zodValidation');
const { createBookingSchema, updateBookingSchema } = require('../utils/validationSchemas');
const {
  getBookings,
  getBooking,
  getBookingsByDate,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getBookings);
router.get('/by-date/:date', [param('date').isISO8601()], validateRequest, getBookingsByDate);
router.get('/:id', [param('id').isInt()], validateRequest, getBooking);
router.post('/', validateWithZod(createBookingSchema), createBooking);
router.put('/:id', [param('id').isInt()], validateRequest, validateWithZod(updateBookingSchema), updateBooking);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteBooking);

module.exports = router;
