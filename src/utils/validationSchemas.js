// src/utils/validationSchemas.js
// Esquemas de validación con Zod para la API
const { z } = require('zod');

// Esquema para login
const loginSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

// Esquema para crear cancha
const createCourtSchema = z.object({
  court_name: z.string().min(1, 'El nombre de la cancha es obligatorio'),
  sport_type: z.string().min(1, 'El tipo de deporte es obligatorio'),
  hourly_rate: z.number().positive('La tarifa por hora debe ser positiva'),
  status: z.enum(['Available', 'Unavailable']).optional().default('Available'),
});

// Esquema para actualizar cancha
const updateCourtSchema = z.object({
  court_name: z.string().min(1).optional(),
  sport_type: z.string().min(1).optional(),
  hourly_rate: z.number().positive().optional(),
  status: z.enum(['Available', 'Unavailable']).optional(),
});

// Esquema para crear reserva
const createBookingSchema = z.object({
  customer_id: z.number().int().positive('El customer_id debe ser un número entero positivo'),
  court_id: z.number().int().positive('El court_id debe ser un número entero positivo'),
  user_id: z.number().int().positive('El user_id debe ser un número entero positivo'),
  booking_date: z.string().refine((date) => !isNaN(Date.parse(date)), 'La fecha de reserva debe ser válida'),
  start_time: z.string().regex(/^(\d{2}):(\d{2}):(\d{2})$/, 'El formato de start_time debe ser HH:MM:SS'),
  end_time: z.string().regex(/^(\d{2}):(\d{2}):(\d{2})$/, 'El formato de end_time debe ser HH:MM:SS'),
  total_amount: z.number().min(0).optional(),
  payment_status: z.string().min(1, 'El estado de pago es obligatorio'),
});

// Esquema para actualizar reserva
const updateBookingSchema = z.object({
  customer_id: z.number().int().positive().optional(),
  court_id: z.number().int().positive().optional(),
  user_id: z.number().int().positive().optional(),
  booking_date: z.string().refine((date) => !isNaN(Date.parse(date)), 'La fecha de reserva debe ser válida').optional(),
  start_time: z.string().regex(/^(\d{2}):(\d{2}):(\d{2})$/).optional(),
  end_time: z.string().regex(/^(\d{2}):(\d{2}):(\d{2})$/).optional(),
  total_amount: z.number().min(0).optional(),
  payment_status: z.string().min(1).optional(),
});

// Esquema para crear cliente
const createCustomerSchema = z.object({
  tax_id: z.string().min(1, 'El ID fiscal es obligatorio'),
  full_name: z.string().min(1, 'El nombre completo es obligatorio'),
  phone_number: z.string().min(1, 'El número de teléfono es obligatorio'),
  member_since: z.string().refine((date) => !isNaN(Date.parse(date)), 'La fecha de membresía debe ser válida').optional(),
  credit_limit: z.number().min(0).optional(),
  outstanding_balance: z.number().min(0).optional(),
});

// Esquema para actualizar cliente
const updateCustomerSchema = z.object({
  tax_id: z.string().min(1).optional(),
  full_name: z.string().min(1).optional(),
  phone_number: z.string().min(1).optional(),
  member_since: z.string().refine((date) => !isNaN(Date.parse(date))).optional(),
  credit_limit: z.number().min(0).optional(),
  outstanding_balance: z.number().min(0).optional(),
});

// Esquema para recuperar contraseña
const forgotPasswordSchema = z.object({
  email: z.string().trim().email('El email debe ser válido').transform((value) => value.toLowerCase()),
});

module.exports = {
  loginSchema,
  createCourtSchema,
  updateCourtSchema,
  createBookingSchema,
  updateBookingSchema,
  createCustomerSchema,
  updateCustomerSchema,
  forgotPasswordSchema,
};
