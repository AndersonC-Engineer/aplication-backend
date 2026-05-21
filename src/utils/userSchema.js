// src/utils/userSchema.js
// Esquemas Zod para registro y gestión de usuarios.
const { z } = require('zod');

const normalizeStatusValue = (value) => {
  const normalized = String(value).trim().toLowerCase();
  if (['active', 'activated', 'actived', 'activo', 'activado'].includes(normalized)) return 'Activated';
  if (['inactive', 'deactivated', 'disabled', 'blocked', 'inactivo', 'desactivado'].includes(normalized)) return 'Deactivated';
  return value;
};

const statusSchema = z
  .string()
  .trim()
  .min(1, 'El status es obligatorio')
  .transform(normalizeStatusValue)
  .refine((value) => ['Activated', 'Deactivated'].includes(value), {
    message: 'El status debe ser Activated o Deactivated',
  });

const registerSchema = z.object({
  username: z.string().trim().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  full_name: z.string().trim().min(1, 'El nombre completo es obligatorio'),
  email: z.string().trim().email('El email debe ser válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role_id: z.coerce.number().int('El role_id debe ser un número entero').positive('El role_id debe ser un número positivo'),
  status: statusSchema.optional().default('Activated'),
});

const updateUserSchema = z.object({
  username: z.string().trim().min(3, 'El nombre de usuario debe tener al menos 3 caracteres').optional(),
  full_name: z.string().trim().min(1, 'El nombre completo es obligatorio').optional(),
  email: z.string().trim().email('El email debe ser válido').optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  role_id: z.coerce.number().int('El role_id debe ser un número entero').positive('El role_id debe ser un número positivo').optional(),
  status: statusSchema.optional(),
});

const profileUpdateSchema = z.object({
  full_name: z.string().trim().min(1, 'El nombre completo es obligatorio').optional(),
  email: z.string().trim().email('El email debe ser válido').transform((v) => v.toLowerCase()).optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
});

module.exports = {
  registerSchema,
  updateUserSchema,
  profileUpdateSchema,
};
