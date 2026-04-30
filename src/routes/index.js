// src/routes/index.js
// Punto de entrada de rutas para la aplicación Express.
const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const courtRoutes = require('./courtRoutes');
const customerRoutes = require('./customerRoutes');
const productRoutes = require('./productRoutes');
const bookingRoutes = require('./bookingRoutes');
const billingRoutes = require('./billingRoutes');
const paymentMethodRoutes = require('./paymentMethodRoutes');
const pendingChargeRoutes = require('./pendingChargeRoutes');
const saleDetailRoutes = require('./saleDetailRoutes');
const auditLogRoutes = require('./auditLogRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/courts', courtRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/bookings', bookingRoutes);
router.use('/billings', billingRoutes);
router.use('/payment-methods', paymentMethodRoutes);
router.use('/pending-charges', pendingChargeRoutes);
router.use('/sale-details', saleDetailRoutes);
router.use('/audit-logs', auditLogRoutes);

module.exports = router;
