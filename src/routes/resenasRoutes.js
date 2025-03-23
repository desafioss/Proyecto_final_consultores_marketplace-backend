// src/routes/resenasRoutes.js
const express = require('express');
const { createResena, getResenasByPack, updateResena, deleteResena } = require('../controllers/resenasController');
const router = express.Router();

router.post('/', createResena);
router.get('/:pack_id', getResenasByPack);
router.put('/:id', updateResena);
router.delete('/:id', deleteResena);

module.exports = router;
