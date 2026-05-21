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
const { authenticateToken } = require('../middleware/auth');
const validateWithZod = require('../middleware/zodValidation');
const { profileUpdateSchema } = require('../utils/userSchema');
const { getProfile, updateProfile } = require('../controllers/profileController');
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

// Profile endpoints
/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 full_name:
 *                   type: string
 *                 role_id:
 *                   type: integer
 *       401:
 *         description: No autorizado
 */
router.get('/profile', authenticateToken, getProfile);
/**
 * @openapi
 * /profile_update:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.put('/profile_update', authenticateToken, validateWithZod(profileUpdateSchema), updateProfile);

module.exports = router;
