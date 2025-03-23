// src/controllers/carritoController.js
const pool = require('../db');

// Crear un carrito
exports.createCarrito = async (req, res) => {
  const { user_id, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO carrito (user_id, estado) VALUES ($1, $2) RETURNING *',
      [user_id, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear carrito' });
  }
};

// Obtener carrito por user_id
exports.getCarritoByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM carrito WHERE user_id = $1', [user_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Actualizar un carrito (por ejemplo, su estado)
exports.updateCarrito = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE carrito SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
};

// Eliminar un carrito
exports.deleteCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM carrito WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json({ message: 'Carrito eliminado correctamente', carrito: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
};
