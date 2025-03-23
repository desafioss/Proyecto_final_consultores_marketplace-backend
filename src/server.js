// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar las rutas con la ruta correcta (sin "src" extra):
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const carritoItemsRoutes = require('./routes/carritoItemsRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const packRoutes = require('./routes/packRoutes');
const resenasRoutes = require('./routes/resenasRoutes');

// Montar las rutas en tu API
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/carrito-items', carritoItemsRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/resenas', resenasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
