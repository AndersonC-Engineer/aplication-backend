// src/services/customerService.js
// Lógica de negocio para clientes con sus reservas.
const BookingModel = require('../models/bookings');
const CustomersModel = require('../models/customers');

const getCustomerBookings = async (customerId) => {
  const customer = await CustomersModel.findById(customerId);
  if (!customer) {
    const error = new Error('Cliente no encontrado');
    error.status = 404;
    throw error;
  }

  return BookingModel.findByCustomerId(customerId);
};

module.exports = {
  getCustomerBookings,
};
