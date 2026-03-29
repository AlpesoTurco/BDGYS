const Guest = require('../models/guestModel');
const generateCode = require('../utils/generateCode');
const QRCode = require('qrcode');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.createGuest = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Nombre y email son requeridos' });
  if (!isValidEmail(email)) return res.status(400).json({ message: 'Email inválido' });

  try {
    const code = await generateCode();
    const id = await Guest.create({ name, email, phone, code });
    res.json({ id, code });
  } catch (error) {
    console.error('Error al crear invitado:', error);
    res.status(500).json({ message: 'Error al crear invitado' });
  }
};

exports.getGuestByCode = async (req, res) => {
  const { code } = req.params;
  if (!code) return res.status(400).json({ message: 'Código requerido' });
  try {
    const guest = await Guest.findByCode(code);
    if (!guest) return res.status(404).json({ message: 'Invitado no encontrado' });
    res.json(guest);
  } catch (error) {
    console.error('Error al obtener invitado:', error);
    res.status(500).json({ message: 'Error al obtener invitado' });
  }
};

exports.confirmRSVP = async (req, res) => {
  const { code } = req.params;
  const { attendance, guests_count, diet, song, message } = req.body;
  if (!code) return res.status(400).json({ message: 'Código requerido' });
  if (!attendance) return res.status(400).json({ message: 'Debe indicar asistencia' });
  if (!guests_count || guests_count < 1) return res.status(400).json({ message: 'Número de acompañantes inválido' });
  try {
    await Guest.updateRSVP(code, req.body);
    res.json({ message: 'Confirmación guardada' });
  } catch (error) {
    console.error('Error al confirmar RSVP:', error);
    res.status(500).json({ message: 'Error al guardar confirmación' });
  }
};

exports.getAllGuests = async (_req, res) => {
  try {
    const guests = await Guest.getAll();
    res.json(guests);
  } catch (error) {
    console.error('Error al obtener invitados:', error);
    res.status(500).json({ message: 'Error al obtener invitados' });
  }
};

exports.getGuestLink = async (req, res) => {
  const { code } = req.params;
  if (!code) return res.status(400).json({ message: 'Código requerido' });
  try {
    const link = `${process.env.BASE_URL}/rsvp.html?code=${code}`;
    res.json({ link });
  } catch (error) {
    console.error('Error al generar link:', error);
    res.status(500).json({ message: 'Error al generar link' });
  }
};

exports.getGuestQR = async (req, res) => {
  const { code } = req.params;
  if (!code) return res.status(400).json({ message: 'Código requerido' });
  try {
    const link = `${process.env.BASE_URL}/rsvp.html?code=${code}`;
    const qr = await QRCode.toDataURL(link);
    res.json({ qr });
  } catch (error) {
    console.error('Error al generar QR:', error);
    res.status(500).json({ message: 'Error al generar QR' });
  }
};

// Actualizar invitado (admin)
exports.updateGuest = async (req, res) => {
  const { id } = req.params;
  const data = req.body || {};

  if (data.email && !isValidEmail(data.email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  try {
    const ok = await Guest.updateById(id, data);
    if (!ok) return res.status(404).json({ message: 'Invitado no encontrado' });
    res.json({ message: 'Invitado actualizado' });
  } catch (error) {
    console.error('Error al actualizar invitado:', error);
    res.status(500).json({ message: 'Error al actualizar invitado' });
  }
};

// Eliminar invitado (admin)
exports.deleteGuest = async (req, res) => {
  const { id } = req.params;
  try {
    const ok = await Guest.deleteById(id);
    if (!ok) return res.status(404).json({ message: 'Invitado no encontrado' });
    res.json({ message: 'Invitado eliminado' });
  } catch (error) {
    console.error('Error al eliminar invitado:', error);
    res.status(500).json({ message: 'Error al eliminar invitado' });
  }
};
