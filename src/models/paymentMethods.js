// src/models/paymentMethods.js
// Modelo para manejar los métodos de pago disponibles.
const pool = require('../config/database');

const PaymentMethodsModel = {
  findAll: async () => {
    const { rows } = await pool.query('SELECT * FROM payment_methods ORDER BY id');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM payment_methods WHERE id = $1', [id]);
    return rows[0];
  },

  create: async ({ method_name, is_active }) => {
    const { rows } = await pool.query(
      'INSERT INTO payment_methods (method_name, is_active) VALUES ($1, $2) RETURNING *',
      [method_name, is_active]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE payment_methods SET ${assignments} WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM payment_methods WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = PaymentMethodsModel;
