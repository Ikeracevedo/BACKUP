const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const conexionDB = require('./config/database');
const categoriaRoutes = require('./routes/categoria.routes');
const productoRoutes = require('./routes/producto.routes');
const adminRoutes = require('./routes/admin.routes');
const contactoRoutes = require('./routes/contacto.routes');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar a la base de datos
conexionDB();

// Ruta simple de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Rutas API
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contacto', contactoRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
