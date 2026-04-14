const creditoService = require('../services/credito.service');

class CreditoController {
  
  async obtenerCreditos(req, res) {
    try {
      const creditos = await creditoService.obtenerTodos();
      res.json({ total: creditos.length, creditos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error inteno al obtener créditos' });
    }
  }

  async crearCredito(req, res) {
    try {
      const nuevoCredito = await creditoService.registrarCredito(req.body);
      res.status(201).json({ 
        mensaje: 'Crédito registrado exitosamente', 
        credito: nuevoCredito 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CreditoController();
