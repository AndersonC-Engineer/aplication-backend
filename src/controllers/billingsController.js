// src/controllers/billingsController.js
// Controlador CRUD para facturas y pagos.
const { validationResult } = require('express-validator');
const BillingsModel = require('../models/billings');

const getBillings = async (req, res, next) => {
  try {
    const billings = await BillingsModel.findAll();
    res.json(billings);
  } catch (err) {
    next(err);
  }
};

const getBilling = async (req, res, next) => {
  try {
    const billing = await BillingsModel.findById(req.params.id);
    if (!billing) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(billing);
  } catch (err) {
    next(err);
  }
};

const createBilling = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const billing = await BillingsModel.create(req.body);
    res.status(201).json(billing);
  } catch (err) {
    next(err);
  }
};

const updateBilling = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const billing = await BillingsModel.update(req.params.id, req.body);
    if (!billing) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(billing);
  } catch (err) {
    next(err);
  }
};

const deleteBilling = async (req, res, next) => {
  try {
    await BillingsModel.remove(req.params.id);
    res.json({ message: 'Factura eliminada correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBillings,
  getBilling,
  createBilling,
  updateBilling,
  deleteBilling,
};
