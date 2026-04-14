const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente.controller');

router.get('/', (req, res) => controller.obtenerTodos(req, res));
router.get('/:id', (req, res) => controller.obtenerPorId(req, res));
router.post('/', (req, res) => controller.crear(req, res));

module.exports = router;
