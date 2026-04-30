// src/controllers/saleDetailsController.js
// Controlador CRUD para detalles de venta.
const { validationResult } = require('express-validator');
const SaleDetailsModel = require('../models/saleDetails');

const getSaleDetails = async (req, res, next) => {
  try {
    const details = await SaleDetailsModel.findAll();
    res.json(details);
  } catch (err) {
    next(err);
  }
};

const getSaleDetail = async (req, res, next) => {
  try {
    const detail = await SaleDetailsModel.findById(req.params.id);
    if (!detail) return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    res.json(detail);
  } catch (err) {
    next(err);
  }
};

const createSaleDetail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const detail = await SaleDetailsModel.create(req.body);
    res.status(201).json(detail);
  } catch (err) {
    next(err);
  }
};

const updateSaleDetail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const detail = await SaleDetailsModel.update(req.params.id, req.body);
    if (!detail) return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    res.json(detail);
  } catch (err) {
    next(err);
  }
};

const deleteSaleDetail = async (req, res, next) => {
  try {
    await SaleDetailsModel.remove(req.params.id);
    res.json({ message: 'Detalle de venta eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSaleDetails,
  getSaleDetail,
  createSaleDetail,
  updateSaleDetail,
  deleteSaleDetail,
};
