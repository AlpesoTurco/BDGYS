const pool = require('./db');

const Admin = {
  async findByUsername(username) {
    const [rows] = await pool.query(
      'SELECT * FROM admins WHERE username = ?',
      [username]
    );

    return rows[0];
  }
};

module.exports = Admin;
