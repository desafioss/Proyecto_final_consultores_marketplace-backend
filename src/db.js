// src/db.js
const { Pool } = require('pg');
// require('dotenv').config(); // Úsalo solo en local si manejas un archivo .env

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Render suele requerir SSL para Postgres en producción
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
