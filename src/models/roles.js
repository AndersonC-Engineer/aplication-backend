// src/models/roles.js
// Modelo para manejar la tabla roles.
const pool = require('../config/database');

const RolesModel = {
  findAll: async () => {
    const { rows } = await pool.query('SELECT * FROM roles ORDER BY id');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    return rows[0];
  },

  create: async ({ role_name, access_level, description }) => {
    const { rows } = await pool.query(
      'INSERT INTO roles (role_name, access_level, description) VALUES ($1, $2, $3) RETURNING *',
      [role_name, access_level, description]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE roles SET ${assignments}, updated_at = now() WHERE id = $${keys.length + 1} RETURNING *`;

    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM roles WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = RolesModel;
