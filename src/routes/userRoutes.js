// src/routes/userRoutes.js
// Rutas protegidas para administrar usuarios.
const express = require('express');
const { param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const validateWithZod = require('../middleware/zodValidation');
const { registerSchema, updateUserSchema } = require('../utils/userSchema');
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
router.post('/', validateWithZod(registerSchema), createUser);
router.put('/:id', [param('id').isInt()], validateRequest, validateWithZod(updateUserSchema), updateUser);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteUser);

module.exports = router;
