// src/models/pendingCharges.js
// Modelo para manejar cargos pendientes asociados a clientes, productos y reservas.
const pool = require('../config/database');

const PendingChargesModel = {
  findAll: async () => {
    const { rows } = await pool.query(
      `SELECT pc.*, c.full_name AS customer_name, p.product_name, b.booking_date
       FROM pending_charges pc
       LEFT JOIN customers c ON pc.customer_id = c.id
       LEFT JOIN products p ON pc.product_id = p.id
       LEFT JOIN bookings b ON pc.booking_id = b.id
       ORDER BY pc.id`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      `SELECT pc.*, c.full_name AS customer_name, p.product_name, b.booking_date
       FROM pending_charges pc
       LEFT JOIN customers c ON pc.customer_id = c.id
       LEFT JOIN products p ON pc.product_id = p.id
       LEFT JOIN bookings b ON pc.booking_id = b.id
       WHERE pc.id = $1`,
      [id]
    );
    return rows[0];
  },

  create: async ({ customer_id, product_id, booking_id, description, quanty, unit_price, subtotal }) => {
    const { rows } = await pool.query(
      `INSERT INTO pending_charges (customer_id, product_id, booking_id, description, quanty, unit_price, subtotal)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [customer_id, product_id, booking_id, description, quanty, unit_price, subtotal]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE pending_charges SET ${assignments} WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM pending_charges WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = PendingChargesModel;
