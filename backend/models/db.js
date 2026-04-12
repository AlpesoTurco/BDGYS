const mysql = require('mysql2/promise');
const path = require('path');
// Asegurar que se cargue el .env situado en /backend aunque el proceso se ejecute desde la ra?z
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = pool;
