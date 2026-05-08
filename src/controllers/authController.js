// src/controllers/authController.js
// Controlador para el flujo de autenticación: registro y login JWT.
const { validationResult } = require('express-validator');
const UsersModel = require('../models/users');
const authService = require('../services/authService');

const sanitizeUserResponse = (user) => {
  if (!user) return null;
  const safeUser = { ...user };
  delete safeUser.password_hash;
  return safeUser;
};

const isBcryptHash = (value) => typeof value === 'string' && /^\$2[aby]\$/.test(value);

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, full_name, email, role_id, status } = req.body;

    const existingUsername = await UsersModel.findByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ message: 'El nombre de usuario ya existe' });
    }

    const existingEmail = await UsersModel.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado' });
    }

    const password_hash = await authService.hashPassword(password);
    const newUser = await UsersModel.create({
      username,
      password_hash,
      full_name,
      email,
      role_id,
      status,
    });

    const token = authService.generateToken(newUser);
    res.status(201).json({ user: sanitizeUserResponse(newUser), token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await UsersModel.findByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    let isMatch = false;
    if (isBcryptHash(user.password_hash)) {
      isMatch = await authService.comparePassword(password, user.password_hash);
    } else if (user.password_hash === password) {
      isMatch = true;
      const password_hash = await authService.hashPassword(password);
      await UsersModel.update(user.id, { password_hash });
      user.password_hash = password_hash;
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = authService.generateToken(user);
    res.json({ user: sanitizeUserResponse(user), token });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UsersModel.findByEmail(email);

    if (!user) {
      // Por seguridad, no revelar si el email existe o no
      return res.json({ message: 'Si el email está registrado, recibirás instrucciones para restablecer tu contraseña' });
    }

    // Aquí simularíamos el envío de email con token de reset
    // Por ahora, solo retornamos un mensaje de éxito
    // En producción, generar token, guardar en DB, enviar email

    res.json({
      message: 'Si el email está registrado, recibirás instrucciones para restablecer tu contraseña',
      // Para testing: incluir token simulado
      resetToken: `reset_${user.id}_${Date.now()}`, // Token temporal para pruebas
      note: 'Este es un token de prueba. En producción, se enviaría por email.'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
};
