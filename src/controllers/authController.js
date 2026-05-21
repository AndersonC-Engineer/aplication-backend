// src/controllers/authController.js
// Controlador para el flujo de autenticación: registro y login JWT.
const { validationResult } = require('express-validator');
const UsersModel = require('../models/users');
const authService = require('../services/authService');
const emailService = require('../services/emailService');
const { generateTemporaryPassword } = require('../utils/passwordUtils');

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
      return res.status(404).json({
        success: true,
        message: 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña',
      });
    }

    const temporaryPassword = generateTemporaryPassword();
    const password_hash = await authService.hashPassword(temporaryPassword);

    await UsersModel.ensureResetPasswordColumn();

    const updatedUser = await UsersModel.update(user.id, {
      password_hash,
      reset_password_at: new Date(),
    });

    try {
      await emailService.sendPasswordResetEmail({
        to: user.email,
        fullName: user.full_name,
        temporaryPassword,
      });
    } catch (emailError) {
      console.error('Error enviando correo de recuperación:', emailError);
    }

    return res.status(200).json({
      success: true,
      message: 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña',
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await UsersModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(sanitizeUserResponse(user));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  getProfile,
};
