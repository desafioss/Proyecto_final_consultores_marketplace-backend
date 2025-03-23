// src/controllers/resenasController.js
const pool = require('../db');

// Crear una reseña
exports.createResena = async (req, res) => {
  const { pack_id, user_id, resena, rating } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO resenas (pack_id, user_id, resena, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [pack_id, user_id, resena, rating]
    );
    res.status(201).json({ message: 'Reseña agregada', resena: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar la reseña' });
  }
};

// Obtener reseñas por pack_id
exports.getResenasByPack = async (req, res) => {
  const { pack_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM resenas WHERE pack_id = $1', [pack_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reseñas' });
  }
};

// Actualizar una reseña
exports.updateResena = async (req, res) => {
  const { id } = req.params;
  const { resena, rating } = req.body;
  try {
    const result = await pool.query(
      'UPDATE resenas SET resena = $1, rating = $2 WHERE id = $3 RETURNING *',
      [resena, rating, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la reseña' });
  }
};

// Eliminar una reseña
exports.deleteResena = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM resenas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    res.status(200).json({ message: 'Reseña eliminada', resena: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la reseña' });
  }
};
