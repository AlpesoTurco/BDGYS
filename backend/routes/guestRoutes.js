const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const verifyToken = require('../middlewares/authMiddleware');

// Admin
router.post('/', verifyToken, guestController.createGuest);
router.get('/', verifyToken, guestController.getAllGuests);
router.put('/:id', verifyToken, guestController.updateGuest);
router.delete('/:id', verifyToken, guestController.deleteGuest);
router.get('/link/:code', verifyToken, guestController.getGuestLink);
router.get('/qr/:code', verifyToken, guestController.getGuestQR);

// Público (debe ir al final para evitar conflictos)
router.get('/:code', guestController.getGuestByCode);
router.post('/rsvp/:code', guestController.confirmRSVP);

module.exports = router;
