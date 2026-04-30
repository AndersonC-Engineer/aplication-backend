// src/models/bookings.js
// Modelo para manejar la tabla bookings y validar horarios superpuestos.
const pool = require('../config/database');

const BookingsModel = {
  findAll: async () => {
    const { rows } = await pool.query(
      `SELECT b.*, c.court_name, cu.full_name AS customer_name, u.full_name AS user_name
       FROM bookings b
       LEFT JOIN courts c ON b.court_id = c.id
       LEFT JOIN customers cu ON b.customer_id = cu.id
       LEFT JOIN users u ON b.user_id = u.id
       ORDER BY b.id`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      `SELECT b.*, c.court_name, cu.full_name AS customer_name, u.full_name AS user_name
       FROM bookings b
       LEFT JOIN courts c ON b.court_id = c.id
       LEFT JOIN customers cu ON b.customer_id = cu.id
       LEFT JOIN users u ON b.user_id = u.id
       WHERE b.id = $1`,
      [id]
    );
    return rows[0];
  },

  findOverlappingBookings: async (court_id, booking_date, start_time, end_time) => {
    const { rows } = await pool.query(
      `SELECT * FROM bookings
       WHERE court_id = $1
         AND booking_date = $2
         AND NOT ($3 >= end_time OR $4 <= start_time)`,
      [court_id, booking_date, start_time, end_time]
    );
    return rows;
  },

  create: async ({ customer_id, court_id, user_id, booking_date, start_time, end_time, total_amount, payment_status }) => {
    const { rows } = await pool.query(
      `INSERT INTO bookings (customer_id, court_id, user_id, booking_date, start_time, end_time, total_amount, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [customer_id, court_id, user_id, booking_date, start_time, end_time, total_amount, payment_status]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE bookings SET ${assignments}, updated_at = now() WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = BookingsModel;
