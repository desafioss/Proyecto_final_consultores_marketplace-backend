// src/routes/authRoutes.js
const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Registro de usuario
router.post('/register', register);

// Login de usuario
router.post('/login', login);

// Obtener perfil (ruta protegida)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
