const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/venta.controller');

router.get('/', (req, res) => ventaController.obtenerVentas(req, res));
router.post('/', (req, res) => ventaController.crearVenta(req, res));

module.exports = router;
