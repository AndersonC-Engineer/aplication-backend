// src/models/saleDetails.js
// Modelo para manejar los detalles de venta relacionados a facturas y productos.
const pool = require('../config/database');

const SaleDetailsModel = {
  findAll: async () => {
    const { rows } = await pool.query(
      `SELECT sd.*, p.product_name, b.total_paid AS billing_total
       FROM sale_details sd
       LEFT JOIN products p ON sd.products_id = p.id
       LEFT JOIN billings b ON sd.billing_id = b.id
       ORDER BY sd.id`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      `SELECT sd.*, p.product_name, b.total_paid AS billing_total
       FROM sale_details sd
       LEFT JOIN products p ON sd.products_id = p.id
       LEFT JOIN billings b ON sd.billing_id = b.id
       WHERE sd.id = $1`,
      [id]
    );
    return rows[0];
  },

  create: async ({ billing_id, products_id, quantity, unit_price_at_sale, subtotal }) => {
    const { rows } = await pool.query(
      `INSERT INTO sale_details (billing_id, products_id, quantity, unit_price_at_sale, subtotal)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [billing_id, products_id, quantity, unit_price_at_sale, subtotal]
    );
    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return null;
    const values = Object.values(fields);
    const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE sale_details SET ${assignments} WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  remove: async (id) => {
    await pool.query('DELETE FROM sale_details WHERE id = $1', [id]);
    return { deleted: true };
  },
};

module.exports = SaleDetailsModel;
