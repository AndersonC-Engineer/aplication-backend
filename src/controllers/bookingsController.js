// src/controllers/bookingsController.js
// Controlador CRUD para reservas con validación de conflictos horarios.
const { validationResult } = require('express-validator');
const BookingsModel = require('../models/bookings');
const bookingService = require('../services/bookingService');

const getBookings = async (req, res, next) => {
  try {
    const bookings = await BookingsModel.findAll();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

const getBookingsByDate = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookingsByDate(req.params.date);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const booking = await BookingsModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const booking = await BookingsModel.update(req.params.id, req.body);
    if (!booking) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    await BookingsModel.remove(req.params.id);
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBookings,
  getBookingsByDate,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
