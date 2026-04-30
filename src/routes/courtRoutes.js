// src/routes/courtRoutes.js
// Rutas protegidas para administrar canchas.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getCourts,
  getCourt,
  createCourt,
  updateCourt,
  deleteCourt,
} = require('../controllers/courtsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getCourts);
router.get('/:id', [param('id').isInt()], validateRequest, getCourt);
router.post(
  '/',
  [
    body('court_name').isString().notEmpty(),
    body('sport_type').isString().notEmpty(),
    body('hourly_rate').isFloat({ gt: 0 }),
    body('status').isString().notEmpty(),
  ],
  validateRequest,
  createCourt
);
router.put('/:id', [param('id').isInt()], validateRequest, updateCourt);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteCourt);

module.exports = router;
