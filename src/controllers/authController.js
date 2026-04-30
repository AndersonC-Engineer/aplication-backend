// src/controllers/authController.js
// Controlador para el flujo de autenticación: registro y login JWT.
const { validationResult } = require('express-validator');
const UsersModel = require('../models/users');
const authService = require('../services/authService');

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
    res.status(201).json({ user: newUser, token });
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

    const isMatch = await authService.comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = authService.generateToken(user);
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
