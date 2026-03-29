const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/guests', require('./routes/guestRoutes'));

// Assets
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// Views (static HTML)
app.use(express.static(path.join(__dirname, '../frontend/views')));

// Routes for pretty URLs
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
});

app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/login.html'));
});

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/admin.html'));
});

module.exports = app;
