// src/routes/authRoutes.js
// Rutas abiertas para registro y login.
const express = require('express');
const { register, login } = require('../controllers/authController');
const validateWithZod = require('../middleware/zodValidation');
const { registerSchema, loginSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.post('/register', validateWithZod(registerSchema), register);

router.post('/login', validateWithZod(loginSchema), login);

module.exports = router;
