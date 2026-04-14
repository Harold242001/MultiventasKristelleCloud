const ventaService = require('../services/venta.service');

class VentaController {
  
  async obtenerVentas(req, res) {
    try {
      const ventas = await ventaService.obtenerTodas();
      res.json({ total: ventas.length, ventas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error inteno al obtener ventas' });
    }
  }

  async crearVenta(req, res) {
    try {
      const ventaNueva = await ventaService.registrarVenta(req.body);
      res.status(201).json({ 
        mensaje: 'Venta registrada exitosamente', 
        venta: ventaNueva 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new VentaController();
