const productoService = require('../services/producto.service');

/**
 * Capa Controladora. Maneja las peticiones HTTP (req, res).
 * Equivale a @RestController en Spring Boot.
 */
class ProductoController {
  
  async obtenerProductos(req, res) {
    try {
      const productos = await productoService.obtenerTodos();
      res.json({ total: productos.length, productos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error inteno del servidor al obtener productos' });
    }
  }

  async registrarProducto(req, res) {
    try {
      const productoNuevo = await productoService.crearProducto(req.body);
      res.status(201).json({ 
        mensaje: 'Producto creado exitosamente', 
        producto: productoNuevo 
      });
    } catch (error) {
      // Manejo del error lanzado por el Servicio (Ej. validación DTO fallida)
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductoController();
