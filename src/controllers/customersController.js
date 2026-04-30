// src/controllers/customersController.js
// Controlador CRUD para clientes.
const { validationResult } = require('express-validator');
const CustomersModel = require('../models/customers');

const getCustomers = async (req, res, next) => {
  try {
    const customers = await CustomersModel.findAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const customer = await CustomersModel.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customer = await CustomersModel.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customer = await CustomersModel.update(req.params.id, req.body);
    if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    await CustomersModel.remove(req.params.id);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
