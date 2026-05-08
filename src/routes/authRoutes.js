// src/routes/authRoutes.js
// Rutas abiertas para registro y login.
const express = require('express');
const { register, login, forgotPassword, getProfile } = require('../controllers/authController');
const validateWithZod = require('../middleware/zodValidation');
const { registerSchema, loginSchema, forgotPasswordSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.post('/register', validateWithZod(registerSchema), register);

router.post('/login', validateWithZod(loginSchema), login);

router.post('/forgot-password', validateWithZod(forgotPasswordSchema), forgotPassword);

router.get('/profile', require('../middleware/auth').authenticateToken, getProfile);

module.exports = router;
