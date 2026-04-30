// src/routes/authRoutes.js
// Rutas abiertas para registro y login.
const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { validateRequest } = require('../utils/handleValidation');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').isString().notEmpty(),
    body('password').isString().isLength({ min: 6 }),
    body('full_name').isString().notEmpty(),
    body('email').isEmail(),
    body('role_id').isInt(),
    body('status').isString().notEmpty(),
  ],
  validateRequest,
  register
);

router.post(
  '/login',
  [body('username').isString().notEmpty(), body('password').isString().notEmpty()],
  validateRequest,
  login
);

module.exports = router;
