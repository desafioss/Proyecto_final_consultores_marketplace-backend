// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuración de CORS para producción: permite solicitudes únicamente desde tu frontend en Netlify
app.use(cors({
  origin: 'https://fancy-creponne-adbea9.netlify.app', // URL exacta de tu sitio en Netlify
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Importación de las rutas
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const carritoItemsRoutes = require('./routes/carritoItemsRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const packRoutes = require('./routes/packRoutes');
const resenasRoutes = require('./routes/resenasRoutes');

// Montar las rutas en la API
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/carrito-items', carritoItemsRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/resenas', resenasRoutes);

// Inicializar el servidor en el puerto configurado o 3001 por defecto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
