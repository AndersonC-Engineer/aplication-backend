// src/models/courts.js
// Modelo para manejar la tabla courts con su estado y tarifa.
const pool = require('../config/database');

const CourtsModel = {
  findAll: async () => {
    const { rows } = await pool.query('SELECT * FROM courts ORDER BY id');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM courts WHERE id = $1', [id]);
    return rows[0];
  },

  create: async ({ court_name, sport_type, hourly_rate, status }) => {
    const { rows } = await pool.query(
      'INSERT INTO courts (court_name, sport_type, hourly_rate, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [court_name, sport_type, hourly_rate, status]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE courts SET ${assignments}, update_at = now() WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM courts WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = CourtsModel;
