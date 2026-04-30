// src/routes/userRoutes.js
// Rutas protegidas para administrar usuarios.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getUsers);
router.get('/:id', [param('id').isInt()], validateRequest, getUser);
router.post(
  '/',
  [
    body('username').isString().notEmpty(),
    body('password').isString().isLength({ min: 6 }),
    body('full_name').isString().notEmpty(),
    body('email').isEmail(),
    body('role_id').isInt(),
    body('status').isString().notEmpty(),
  ],
  validateRequest,
  createUser
);
router.put(
  '/:id',
  [param('id').isInt(), body('email').optional().isEmail(), body('password').optional().isLength({ min: 6 })],
  validateRequest,
  updateUser
);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteUser);

module.exports = router;
