// src/routes/carritoItemsRoutes.js
const express = require('express');
const { createCarritoItem, getCarritoItemsByCarrito, updateCarritoItem, deleteCarritoItem } = require('../controllers/carritoItemsController');
const router = express.Router();

router.post('/', createCarritoItem);
router.get('/:carrito_id', getCarritoItemsByCarrito);
router.put('/:id', updateCarritoItem);
router.delete('/:id', deleteCarritoItem);

module.exports = router;
