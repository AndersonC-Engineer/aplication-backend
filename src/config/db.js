const { Pool } = require('pg');
require('dotenv').config(); // Esto es lo que lee el archivo .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Obligatorio para Neon
  }
});

pool.on('connect', () => {
  console.log('✅ Conexión exitosa a la base de datos de Neon');
});

module.exports = pool;