// src/models/products.js
// Modelo para manejar el catálogo de productos y su stock.
const pool = require('../config/database');

const ProductsModel = {
  findAll: async () => {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
  },

  findByName: async (product_name) => {
    const { rows } = await pool.query('SELECT * FROM products WHERE product_name = $1', [product_name]);
    return rows[0];
  },

  create: async ({ product_name, current_stock, sale_price, purcharse_price }) => {
    const { rows } = await pool.query(
      `INSERT INTO products (product_name, current_stock, sale_price, purcharse_price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [product_name, current_stock, sale_price, purcharse_price]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE products SET ${assignments}, updated_at = now() WHERE id = $${keys.length + 1} RETURNING *`;

    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = ProductsModel;
