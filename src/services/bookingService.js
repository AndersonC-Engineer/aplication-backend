// src/services/bookingService.js
// Lógica de negocio de reservas: valida disponibilidad y calcula precios.
const BookingModel = require('../models/bookings');
const CourtsModel = require('../models/courts');

const parseTime = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const calculateTotalAmount = async (court_id, booking_date, start_time, end_time) => {
  const court = await CourtsModel.findById(court_id);
  if (!court) {
    const error = new Error('Cancha no encontrada para calcular el precio');
    error.status = 404;
    throw error;
  }

  const startSeconds = parseTime(start_time);
  const endSeconds = parseTime(end_time);
  const durationHours = Math.max((endSeconds - startSeconds) / 3600, 0);

  if (durationHours <= 0) {
    const error = new Error('El intervalo de tiempo debe ser válido');
    error.status = 400;
    throw error;
  }

  return parseFloat((court.hourly_rate * durationHours).toFixed(2));
};

/**
 * Crea una reserva validando superposición de horarios y calculando total si es necesario.
 */
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

  if (!bookingData.total_amount || bookingData.total_amount <= 0) {
    bookingData.total_amount = await calculateTotalAmount(
      bookingData.court_id,
      bookingData.booking_date,
      bookingData.start_time,
      bookingData.end_time
    );
  }

  return BookingModel.create(bookingData);
};

const getBookingsByDate = async (booking_date) => {
  return BookingModel.findByDate(booking_date);
};

module.exports = {
  createBooking,
  getBookingsByDate,
};
