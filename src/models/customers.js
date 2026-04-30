// src/models/customers.js
// Modelo para manejar la tabla customers con su información de cliente.
const pool = require('../config/database');

const CustomersModel = {
  findAll: async () => {
    const { rows } = await pool.query('SELECT * FROM customers ORDER BY id');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    return rows[0];
  },

  create: async ({ tax_id, full_name, phone_number, member_since, credit_limit, outstanding_balance }) => {
    const { rows } = await pool.query(
      `INSERT INTO customers (tax_id, full_name, phone_number, member_since, credit_limit, outstanding_balance)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [tax_id, full_name, phone_number, member_since, credit_limit, outstanding_balance]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE customers SET ${assignments}, updated_at = now() WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM customers WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = CustomersModel;
