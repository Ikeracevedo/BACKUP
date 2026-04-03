const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contacto.controller');

// Rutas de contacto
router.post('/', contactoController.crearMensaje);
router.get('/', contactoController.obtenerMensajes);
router.put('/:id/estado', contactoController.actualizarEstado);
router.delete('/:id', contactoController.eliminarMensaje);

module.exports = router;
