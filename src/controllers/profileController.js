// src/controllers/profileController.js
const UsersModel = require('../models/users');
const authService = require('../services/authService');

const sanitizeUser = (user) => {
  if (!user) return null;
  const safe = { ...user };
  delete safe.password_hash;
  return safe;
};

const getProfile = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await UsersModel.findById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ id: user.id, email: user.email, full_name: user.full_name, role_id: user.role_id });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const id = req.user.id;
    const fields = { ...req.body };

    if (fields.password) {
      fields.password_hash = await authService.hashPassword(fields.password);
      delete fields.password;
    }

    const updated = await UsersModel.update(id, fields);
    if (!updated) return res.status(400).json({ message: 'No se actualizaron los datos' });
    res.json({ user: sanitizeUser(updated) });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
