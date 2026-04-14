const productoService = require('../services/producto.service');

class ProductoController {
  async obtenerProductos(req, res) {
    try {
      const productos = await productoService.obtenerTodos();
      res.json({ total: productos.length, productos });
    } catch (error) {
      res.status(500).json({ error: 'Error interno' });
    }
  }

  async obtenerProductoPorId(req, res) {
    try {
      const producto = await productoService.obtenerPorId(req.params.id);
      res.json(producto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async registrarProducto(req, res) {
    try {
      const productoNuevo = await productoService.crearProducto(req.body);
      res.status(201).json(productoNuevo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const editado = await productoService.actualizarProducto(req.params.id, req.body);
      res.json(editado);
    } catch (e) { res.status(400).json({ error: e.message }); }
  }

  async eliminar(req, res) {
    try {
      await productoService.borrarProducto(req.params.id);
      res.status(200).json({ mensaje: 'Producto eliminado con éxito', id: req.params.id });
    } catch (e) { 
      console.error(e);
      res.status(500).json({ error: e.message }); 
    }
  }
}

module.exports = new ProductoController();
