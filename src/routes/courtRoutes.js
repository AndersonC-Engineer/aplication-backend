// src/routes/courtRoutes.js
// Rutas protegidas para administrar canchas.
const express = require('express');
const { param, query } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const validateWithZod = require('../middleware/zodValidation');
const { createCourtSchema, updateCourtSchema } = require('../utils/validationSchemas');
const {
  getCourts,
  getCourt,
  getAvailableCourts,
  getCourtAvailability,
  createCourt,
  updateCourt,
  deleteCourt,
} = require('../controllers/courtsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getCourts);
router.get('/available', [
  query('booking_date').optional().isISO8601(),
  query('start_time').optional().matches(/^\d{2}:\d{2}:\d{2}$/),
  query('end_time').optional().matches(/^\d{2}:\d{2}:\d{2}$/),
], validateRequest, getAvailableCourts);
router.get('/:id/availability', [
  param('id').isInt(),
  query('booking_date').isISO8601(),
  query('start_time').optional().matches(/^\d{2}:\d{2}:\d{2}$/),
  query('end_time').optional().matches(/^\d{2}:\d{2}:\d{2}$/),
], validateRequest, getCourtAvailability);
router.get('/:id', [param('id').isInt()], validateRequest, getCourt);
router.post('/', validateWithZod(createCourtSchema), createCourt);
router.put('/:id', [param('id').isInt()], validateRequest, validateWithZod(updateCourtSchema), updateCourt);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteCourt);

module.exports = router;
