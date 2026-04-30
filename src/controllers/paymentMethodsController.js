// src/controllers/paymentMethodsController.js
// Controlador CRUD para los métodos de pago.
const { validationResult } = require('express-validator');
const PaymentMethodsModel = require('../models/paymentMethods');

const getPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethodsModel.findAll();
    res.json(paymentMethods);
  } catch (err) {
    next(err);
  }
};

const getPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethodsModel.findById(req.params.id);
    if (!paymentMethod) return res.status(404).json({ message: 'Método de pago no encontrado' });
    res.json(paymentMethod);
  } catch (err) {
    next(err);
  }
};

const createPaymentMethod = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const paymentMethod = await PaymentMethodsModel.create(req.body);
    res.status(201).json(paymentMethod);
  } catch (err) {
    next(err);
  }
};

const updatePaymentMethod = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const paymentMethod = await PaymentMethodsModel.update(req.params.id, req.body);
    if (!paymentMethod) return res.status(404).json({ message: 'Método de pago no encontrado' });
    res.json(paymentMethod);
  } catch (err) {
    next(err);
  }
};

const deletePaymentMethod = async (req, res, next) => {
  try {
    await PaymentMethodsModel.remove(req.params.id);
    res.json({ message: 'Método de pago eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPaymentMethods,
  getPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
