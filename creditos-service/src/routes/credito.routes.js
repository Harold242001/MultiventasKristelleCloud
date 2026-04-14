const express = require('express');
const router = express.Router();
const creditoController = require('../controllers/credito.controller');

router.get('/', (req, res) => creditoController.obtenerCreditos(req, res));
router.post('/', (req, res) => creditoController.crearCredito(req, res));

module.exports = router;
