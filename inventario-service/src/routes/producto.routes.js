const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// Definición de las rutas REST (Equivale a @GetMapping, @PostMapping)
router.get('/', (req, res) => productoController.obtenerProductos(req, res));
router.get('/:id', (req, res) => productoController.obtenerProductoPorId(req, res));
router.post('/', (req, res) => productoController.registrarProducto(req, res));
router.put('/:id', (req, res) => productoController.actualizar(req, res));
router.delete('/:id', (req, res) => productoController.eliminar(req, res));

module.exports = router;
