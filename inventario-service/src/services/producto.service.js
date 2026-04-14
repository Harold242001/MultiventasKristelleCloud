const productoRepository = require('../repositories/producto.repository');
const ProductoDTO = require('../models/dto/producto.dto');

class ProductoService {
  async obtenerTodos() {
    return await productoRepository.findAll();
  }

  async obtenerPorId(id) {
    const producto = await productoRepository.findById(id);
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  }

  async crearProducto(datosPost) {
    const dto = new ProductoDTO(datosPost);
    if (!dto.esValido()) throw new Error('Datos de producto inválidos');
    const entidad = { id: 'prod-' + Math.random().toString(36).substr(2, 5), ...dto };
    return await productoRepository.save(entidad);
  }

  async actualizarProducto(id, datos) {
    await this.obtenerPorId(id);
    return await productoRepository.update(id, datos);
  }

  async borrarProducto(id) {
    await this.obtenerPorId(id);
    return await productoRepository.remove(id);
  }
}

module.exports = new ProductoService();
