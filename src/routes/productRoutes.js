// src/routes/productRoutes.js
// Rutas protegidas para administrar productos.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getProducts);
router.get('/:id', [param('id').isInt()], validateRequest, getProduct);
router.post(
  '/',
  [
    body('product_name').isString().notEmpty(),
    body('current_stock').optional().isInt({ min: 0 }),
    body('sale_price').optional().isFloat({ min: 0 }),
    body('purcharse_price').optional().isFloat({ min: 0 }),
  ],
  validateRequest,
  createProduct
);
router.put('/:id', [param('id').isInt()], validateRequest, updateProduct);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteProduct);

module.exports = router;
