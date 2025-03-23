// src/routes/comentariosRoutes.js
const express = require('express');
const { createComentario, getComentariosByPost, updateComentario, deleteComentario } = require('../controllers/comentariosController');
const router = express.Router();

router.post('/', createComentario);
router.get('/:post_id', getComentariosByPost);
router.put('/:id', updateComentario);
router.delete('/:id', deleteComentario);

module.exports = router;
