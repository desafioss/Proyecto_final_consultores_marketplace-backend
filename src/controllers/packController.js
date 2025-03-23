// src/controllers/packController.js
const pool = require('../db');

exports.getAllPacks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM packs');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener packs' });
  }
};

exports.getPack = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM packs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pack no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el pack' });
  }
};

exports.createPack = async (req, res) => {
  try {
    const { titulo, descripcion, precio } = req.body;
    await pool.query(
      'INSERT INTO packs (titulo, descripcion, precio) VALUES ($1, $2, $3)',
      [titulo, descripcion, precio]
    );
    res.status(201).json({ message: 'Pack creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear pack' });
  }
};
