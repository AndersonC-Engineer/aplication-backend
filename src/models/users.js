// src/models/users.js
// Modelo para manejar la tabla users y sus relaciones con roles.
const pool = require('../config/database');

const UsersModel = {
  findAll: async () => {
    const { rows } = await pool.query(
      'SELECT u.*, r.role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id ORDER BY u.id'
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      'SELECT u.*, r.role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = $1',
      [id]
    );
    return rows[0];
  },

  findByUsername: async (username) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },

  create: async ({ username, password_hash, full_name, email, role_id, status }) => {
    const { rows } = await pool.query(
      `INSERT INTO users (username, password_hash, full_name, email, role_id, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [username, password_hash, full_name, email, role_id, status]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE users SET ${assignments}, updated_at = now() WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = UsersModel;
