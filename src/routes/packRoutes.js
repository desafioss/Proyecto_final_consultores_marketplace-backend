// src/routes/packRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllPacks, getPack, createPack } = require('../controllers/packController');
const router = express.Router();

// Ruta pública: Obtener todos los packs
router.get('/', getAllPacks);

// Ruta pública: Obtener un pack por id
router.get('/:id', getPack);

// Ruta protegida: Crear un pack (requiere token)
router.post('/', authMiddleware, createPack);

module.exports = router;
