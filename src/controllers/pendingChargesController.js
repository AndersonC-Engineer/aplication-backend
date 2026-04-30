// src/controllers/pendingChargesController.js
// Controlador CRUD para cargos pendientes.
const { validationResult } = require('express-validator');
const PendingChargesModel = require('../models/pendingCharges');

const getPendingCharges = async (req, res, next) => {
  try {
    const charges = await PendingChargesModel.findAll();
    res.json(charges);
  } catch (err) {
    next(err);
  }
};

const getPendingCharge = async (req, res, next) => {
  try {
    const charge = await PendingChargesModel.findById(req.params.id);
    if (!charge) return res.status(404).json({ message: 'Cargo pendiente no encontrado' });
    res.json(charge);
  } catch (err) {
    next(err);
  }
};

const createPendingCharge = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const charge = await PendingChargesModel.create(req.body);
    res.status(201).json(charge);
  } catch (err) {
    next(err);
  }
};

const updatePendingCharge = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const charge = await PendingChargesModel.update(req.params.id, req.body);
    if (!charge) return res.status(404).json({ message: 'Cargo pendiente no encontrado' });
    res.json(charge);
  } catch (err) {
    next(err);
  }
};

const deletePendingCharge = async (req, res, next) => {
  try {
    await PendingChargesModel.remove(req.params.id);
    res.json({ message: 'Cargo pendiente eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPendingCharges,
  getPendingCharge,
  createPendingCharge,
  updatePendingCharge,
  deletePendingCharge,
};
