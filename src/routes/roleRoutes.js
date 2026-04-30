// src/routes/roleRoutes.js
// Rutas protegidas para administrar roles de usuario.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/rolesController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getRoles);
router.get('/:id', [param('id').isInt()], validateRequest, getRole);
router.post(
  '/',
  [body('role_name').isString().notEmpty(), body('access_level').isInt(), body('description').optional().isString()],
  validateRequest,
  createRole
);
router.put('/:id', [param('id').isInt()], validateRequest, updateRole);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteRole);

module.exports = router;
