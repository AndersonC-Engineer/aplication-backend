// src/services/courtService.js
// Lógica de negocio para canchas y disponibilidad.
const CourtsModel = require('../models/courts');
const BookingsModel = require('../models/bookings');

const getAvailableCourts = async ({ booking_date, start_time, end_time }) => {
  return CourtsModel.findAvailable({ booking_date, start_time, end_time });
};

const getCourtAvailability = async (courtId, { booking_date, start_time, end_time }) => {
  if (!booking_date) {
    const error = new Error('El parámetro booking_date es obligatorio');
    error.status = 400;
    throw error;
  }

  const court = await CourtsModel.findById(courtId);
  if (!court) {
    const error = new Error('Cancha no encontrada');
    error.status = 404;
    throw error;
  }

  const bookings = await BookingsModel.findBookingsByCourtAndDate(courtId, booking_date, start_time, end_time);
  const available = bookings.length === 0;

  return {
    court,
    available,
    booking_date,
    start_time: start_time || null,
    end_time: end_time || null,
    conflicts: bookings,
  };
};

module.exports = {
  getAvailableCourts,
  getCourtAvailability,
};
