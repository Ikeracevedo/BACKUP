
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');
// Importa el middleware de multer (para subir imágenes)
const upload = require('../middlewares/upload');

//Rutas del CRUD de categorias
router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/activas', categoriaController.obtenerActivas);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.put('/:id', categoriaController.actualizarCategoria);
router.post('/:id/imagen', upload.single('imagen'), categoriaController.subirImagen);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;