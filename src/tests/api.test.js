// tests/api.test.js
const request = require('supertest');
const express = require('express');
const app = express();
const pool = require('../db'); // Asegúrate de que la ruta sea la correcta
const authRoutes = require('../routes/authRoutes');
const packRoutes = require('../routes/packRoutes'); // Suponiendo que ya tienes implementado packRoutes
require('dotenv').config();

// Configuramos la aplicación para parsear JSON y usar los routers
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/packs', packRoutes);

describe('Pruebas de la API REST', () => {
  // Limpiamos el usuario de prueba al finalizar las pruebas
  afterAll(async () => {
    try {
      await pool.query('DELETE FROM usuarios WHERE email = $1', ['test@example.com']);
    } catch (error) {
      console.error('Error en afterAll:', error);
    }
    pool.end();
  });

  test('POST /api/auth/register - Registro exitoso de un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Test',
        apellido: 'User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuario registrado exitosamente');
  });

  test('POST /api/auth/register - Error al registrar usuario duplicado', async () => {
    // Intentamos registrar el mismo usuario nuevamente
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Test',
        apellido: 'User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('El usuario ya existe');
  });

  test('POST /api/auth/login - Login exitoso y retorno de token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('GET /api/auth/profile - Acceso al perfil con token válido', async () => {
    // Primero se realiza login para obtener el token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    const token = loginResponse.body.token;

    // Se accede al perfil usando el token en la cabecera Authorization
    const profileResponse = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.email).toBe('test@example.com');
    expect(profileResponse.body.nombre).toBe('Test');
    expect(profileResponse.body.apellido).toBe('User');
  });

  test('GET /api/packs - Listado de packs (endpoint público)', async () => {
    const response = await request(app).get('/api/packs');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
