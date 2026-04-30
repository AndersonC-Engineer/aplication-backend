// src/routes/auditLogRoutes.js
// Rutas protegidas para consultar logs de auditoría.
const express = require('express');
const { param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const { getAuditLogs, getAuditLog } = require('../controllers/auditLogsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getAuditLogs);
router.get('/:id', [param('id').isInt()], validateRequest, getAuditLog);

module.exports = router;
