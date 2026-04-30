// src/models/billings.js
// Modelo para manejar la tabla billings y su estado de pago.
const pool = require('../config/database');

const BillingsModel = {
  findAll: async () => {
    const { rows } = await pool.query(
      `SELECT b.*, c.full_name AS customer_name, u.full_name AS user_name, pm.method_name
       FROM billings b
       LEFT JOIN customers c ON b.customer_id = c.id
       LEFT JOIN users u ON b.user_id = u.id
       LEFT JOIN payment_methods pm ON b.payment_method_id = pm.id
       ORDER BY b.id`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      `SELECT b.*, c.full_name AS customer_name, u.full_name AS user_name, pm.method_name
       FROM billings b
       LEFT JOIN customers c ON b.customer_id = c.id
       LEFT JOIN users u ON b.user_id = u.id
       LEFT JOIN payment_methods pm ON b.payment_method_id = pm.id
       WHERE b.id = $1`,
      [id]
    );
    return rows[0];
  },

  create: async ({ customer_id, user_id, booking_id, payment_method_id, total_paid, payment_status }) => {
    const { rows } = await pool.query(
      `INSERT INTO billings (customer_id, user_id, booking_id, payment_method_id, total_paid, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [customer_id, user_id, booking_id, payment_method_id, total_paid, payment_status]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE billings SET ${assignments}, update_at = now() WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM billings WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = BillingsModel;
