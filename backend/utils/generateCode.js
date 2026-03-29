const pool = require('../models/db');

async function generateUniqueCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  while (true) {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const [rows] = await pool.query(
      'SELECT id FROM guests WHERE invitation_code = ?',
      [code]
    );

    if (rows.length === 0) return code;
  }
}

module.exports = generateUniqueCode;
