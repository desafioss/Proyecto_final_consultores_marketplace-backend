// src/controllers/carritoItemsController.js
const pool = require('../db');

// Agregar un item al carrito
exports.createCarritoItem = async (req, res) => {
  const { carrito_id, pack_id, cantidad } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO carrito_items (carrito_id, pack_id, cantidad) VALUES ($1, $2, $3) RETURNING *',
      [carrito_id, pack_id, cantidad]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar item al carrito' });
  }
};

// Obtener ítems por carrito_id
exports.getCarritoItemsByCarrito = async (req, res) => {
  const { carrito_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM carrito_items WHERE carrito_id = $1', [carrito_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los items del carrito' });
  }
};

// Actualizar la cantidad de un item del carrito
exports.updateCarritoItem = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  try {
    const result = await pool.query(
      'UPDATE carrito_items SET cantidad = $1 WHERE id = $2 RETURNING *',
      [cantidad, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el item del carrito' });
  }
};

// Eliminar un item del carrito
exports.deleteCarritoItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM carrito_items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' });
    }
    res.status(200).json({ message: 'Item eliminado del carrito', item: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el item del carrito' });
  }
};
