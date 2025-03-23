// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { email, apellido, password, nombre } = req.body;

    // Verifica si el usuario ya existe
    const userExist = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Inserta en la base de datos, usando 4 parámetros: nombre, apellido, email y hashedPassword
    await pool.query(
      'INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4)',
      [nombre, apellido, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userQuery = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = userQuery.rows[0];
    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Genera el token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Agrega el endpoint para obtener el perfil del usuario
// Asegúrate de que en el middleware de autenticación se asigne el valor a req.userId
// Agrega esta función al final de authController.js
exports.getProfile = async (req, res) => {
  try {
    const userQuery = await pool.query(
      'SELECT id, nombre, apellido, email FROM usuarios WHERE id = $1',
      [req.userId]
    );
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(userQuery.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};
