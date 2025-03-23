// src/controllers/comentariosController.js
const pool = require('../db');

// Crear un comentario
exports.createComentario = async (req, res) => {
  const { post_id, user_id, comentario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO comentarios (post_id, user_id, comentario) VALUES ($1, $2, $3) RETURNING *',
      [post_id, user_id, comentario]
    );
    res.status(201).json({ message: 'Comentario agregado', comentario: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
};

// Obtener comentarios por post_id
exports.getComentariosByPost = async (req, res) => {
  const { post_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM comentarios WHERE post_id = $1', [post_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

// Actualizar un comentario
exports.updateComentario = async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;
  try {
    const result = await pool.query(
      'UPDATE comentarios SET comentario = $1 WHERE id = $2 RETURNING *',
      [comentario, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar comentario' });
  }
};

// Eliminar un comentario
exports.deleteComentario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM comentarios WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.status(200).json({ message: 'Comentario eliminado', comentario: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar comentario' });
  }
};
