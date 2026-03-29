const pool = require('./db');

const Guest = {
  async create(data) {
    const [result] = await pool.query(
      `INSERT INTO guests 
      (name, email, phone, invitation_code) 
      VALUES (?, ?, ?, ?)` ,
      [data.name, data.email, data.phone, data.code]
    );
    return result.insertId;
  },

  async findByCode(code) {
    const [rows] = await pool.query('SELECT * FROM guests WHERE invitation_code = ?', [code]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM guests WHERE id = ?', [id]);
    return rows[0];
  },

  async updateRSVP(code, data) {
    const [guestRows] = await pool.query('SELECT id FROM guests WHERE invitation_code = ?', [code]);
    if (guestRows.length === 0) throw new Error('Guest no encontrado');
    const guestId = guestRows[0].id;

    await pool.query(
      `UPDATE guests 
       SET attendance=?, guests_count=?, diet=?, song=?, message=? 
       WHERE invitation_code=?`,
      [data.attendance, data.guests_count, data.diet, data.song, data.message, code]
    );

    if (data.guests_count > 1) {
      await pool.query('DELETE FROM companions WHERE guest_id = ?', [guestId]);
      for (let i = 1; i < data.guests_count; i++) {
        await pool.query(
          `INSERT INTO companions (guest_id, name, diet) VALUES (?, ?, ?)`,
          [guestId, `Acompañante ${i}`, data.diet]
        );
      }
    } else {
      await pool.query('DELETE FROM companions WHERE guest_id = ?', [guestId]);
    }
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM guests');
    return rows;
  },

  async updateById(id, data) {
    const fields = ['name', 'email', 'phone', 'attendance', 'guests_count', 'diet', 'song', 'message'];
    const updates = [];
    const values = [];
    fields.forEach((f) => {
      if (data[f] !== undefined) { updates.push(`${f} = ?`); values.push(data[f]); }
    });
    if (!updates.length) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE guests SET ${updates.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async deleteById(id) {
    await pool.query('DELETE FROM companions WHERE guest_id = ?', [id]);
    const [result] = await pool.query('DELETE FROM guests WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Guest;
