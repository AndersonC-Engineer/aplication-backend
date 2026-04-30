// src/controllers/rolesController.js
// Controlador CRUD para los roles del sistema.
const { validationResult } = require('express-validator');
const RolesModel = require('../models/roles');

const getRoles = async (req, res, next) => {
  try {
    const roles = await RolesModel.findAll();
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

const getRole = async (req, res, next) => {
  try {
    const role = await RolesModel.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(role);
  } catch (err) {
    next(err);
  }
};

const createRole = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const role = await RolesModel.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const role = await RolesModel.update(req.params.id, req.body);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(role);
  } catch (err) {
    next(err);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    await RolesModel.remove(req.params.id);
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
