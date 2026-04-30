// src/controllers/usersController.js
// Controlador CRUD para usuarios.
const { validationResult } = require('express-validator');
const UsersModel = require('../models/users');
const authService = require('../services/authService');

const sanitizeUser = (user) => {
  if (!user) return null;
  const safeUser = { ...user };
  delete safeUser.password_hash;
  return safeUser;
};

const sanitizeUsers = (users) => users.map(sanitizeUser);

const getUsers = async (req, res, next) => {
  try {
    const users = await UsersModel.findAll();
    res.json(sanitizeUsers(users));
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await UsersModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, full_name, email, role_id, status } = req.body;
    const existingUser = await UsersModel.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario ya existe' });
    }

    const password_hash = await authService.hashPassword(password);
    const user = await UsersModel.create({ username, password_hash, full_name, email, role_id, status });
    res.status(201).json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fields = { ...req.body };
    if (fields.password) {
      fields.password_hash = await authService.hashPassword(fields.password);
      delete fields.password;
    }

    const user = await UsersModel.update(req.params.id, fields);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await UsersModel.remove(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
