// src/routes/usuariosRoutes.js
const express = require('express');
const { getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require('../controllers/usuariosController');
const router = express.Router();

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
