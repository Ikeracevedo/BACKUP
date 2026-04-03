const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Rutas de administración
router.post('/register', adminController.crearAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/resumen', adminController.obtenerResumen);
router.get('/perfil', adminController.obtenerPerfil);

module.exports = router;
