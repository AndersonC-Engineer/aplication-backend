// src/models/auditLogs.js
// Modelo para manejar los registros de auditoría.
const pool = require('../config/database');

const AuditLogsModel = {
  findAll: async () => {
    const { rows } = await pool.query(
      `SELECT al.*, u.username AS user_name
       FROM audit_logs al
       LEFT JOIN users u ON al.user_id = u.id
       ORDER BY al.created_id DESC`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      `SELECT al.*, u.username AS user_name
       FROM audit_logs al
       LEFT JOIN users u ON al.user_id = u.id
       WHERE al.id = $1`,
      [id]
    );
    return rows[0];
  },
};

module.exports = AuditLogsModel;
