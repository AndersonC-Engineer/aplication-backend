// src/controllers/courtsController.js
// Controlador CRUD para canchas y administración de estado.
const { validationResult } = require('express-validator');
const CourtsModel = require('../models/courts');
const courtService = require('../services/courtService');

const getCourts = async (req, res, next) => {
  try {
    const courts = await CourtsModel.findAll();
    res.json(courts);
  } catch (err) {
    next(err);
  }
};

const getCourt = async (req, res, next) => {
  try {
    const court = await CourtsModel.findById(req.params.id);
    if (!court) return res.status(404).json({ message: 'Cancha no encontrada' });
    res.json(court);
  } catch (err) {
    next(err);
  }
};

const getAvailableCourts = async (req, res, next) => {
  try {
    const courts = await courtService.getAvailableCourts(req.query);
    res.json(courts);
  } catch (err) {
    next(err);
  }
};

const getCourtAvailability = async (req, res, next) => {
  try {
    const availability = await courtService.getCourtAvailability(req.params.id, req.query);
    res.json(availability);
  } catch (err) {
    next(err);
  }
};

const createCourt = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const court = await CourtsModel.create(req.body);
    res.status(201).json(court);
  } catch (err) {
    next(err);
  }
};

const updateCourt = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const court = await CourtsModel.update(req.params.id, req.body);
    if (!court) return res.status(404).json({ message: 'Cancha no encontrada' });
    res.json(court);
  } catch (err) {
    next(err);
  }
};

const deleteCourt = async (req, res, next) => {
  try {
    await CourtsModel.remove(req.params.id);
    res.json({ message: 'Cancha eliminada correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCourts,
  getCourt,
  getAvailableCourts,
  getCourtAvailability,
  createCourt,
  updateCourt,
  deleteCourt,
};
