// src/routes/saleDetailRoutes.js
// Rutas protegidas para administrar los detalles de venta.
const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../utils/handleValidation');
const {
  getSaleDetails,
  getSaleDetail,
  createSaleDetail,
  updateSaleDetail,
  deleteSaleDetail,
} = require('../controllers/saleDetailsController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', getSaleDetails);
router.get('/:id', [param('id').isInt()], validateRequest, getSaleDetail);
router.post(
  '/',
  [
    body('billing_id').isInt(),
    body('products_id').isInt(),
    body('quantity').isInt({ min: 1 }),
    body('unit_price_at_sale').isFloat({ min: 0 }),
    body('subtotal').isFloat({ min: 0 }),
  ],
  validateRequest,
  createSaleDetail
);
router.put('/:id', [param('id').isInt()], validateRequest, updateSaleDetail);
router.delete('/:id', [param('id').isInt()], validateRequest, deleteSaleDetail);

module.exports = router;
