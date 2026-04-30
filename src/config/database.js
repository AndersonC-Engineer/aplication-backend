// src/config/database.js
// Exporta la conexión ya configurada en src/config/db.js para mantener la configuración centralizadas
const pool = require('./db');

module.exports = pool;
