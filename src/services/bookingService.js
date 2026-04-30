// src/services/bookingService.js
// Lógica de negocio de reservas: valida disponibilidad antes de crear una reserva.
const BookingModel = require('../models/bookings');

const createBooking = async (bookingData) => {
  const overlapping = await BookingModel.findOverlappingBookings(
    bookingData.court_id,
    bookingData.booking_date,
    bookingData.start_time,
    bookingData.end_time
  );

  if (overlapping.length) {
    const error = new Error('La cancha ya tiene una reserva en ese horario');
    error.status = 409;
    throw error;
  }

  return BookingModel.create(bookingData);
};

module.exports = {
  createBooking,
};
