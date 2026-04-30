// src/services/authService.js
// Lógica de negocio de autenticación, incluyendo el hashing y creación de JWT.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role_id: user.role_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
