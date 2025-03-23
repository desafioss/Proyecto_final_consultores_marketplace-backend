// src/routes/carritoRoutes.js
const express = require('express');
const { createCarrito, getCarritoByUser, updateCarrito, deleteCarrito } = require('../controllers/carritoController');
const router = express.Router();

router.post('/', createCarrito);
router.get('/:user_id', getCarritoByUser);
router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarrito);

module.exports = router;
