// src/controllers/auditLogsController.js
// Controlador para consultar logs de auditoría.
const AuditLogsModel = require('../models/auditLogs');

const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLogsModel.findAll();
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

const getAuditLog = async (req, res, next) => {
  try {
    const log = await AuditLogsModel.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Registro de auditoría no encontrado' });
    res.json(log);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAuditLogs,
  getAuditLog,
};
