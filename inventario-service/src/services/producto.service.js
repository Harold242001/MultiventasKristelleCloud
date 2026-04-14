const productoRepository = require('../repositories/producto.repository');
const ProductoDTO = require('../models/dto/producto.dto');
const { v4: uuidv4 } = require('uuid');

/**
 * Capa de Lógica de Negocio. 
 * Equivale a los @Service en Spring Boot.
 */
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
    
    if (!dto.esValido()) {
      throw new Error('Datos inválidos para crear el producto. Revisar nombre y precio.');
    }

    // Creando la "Entidad" antes de guardar
    const productoEntity = {
      id: uuidv4(),
      nombre: dto.nombre,
      categoria: dto.categoria,
      precioUnitario: dto.precioUnitario,
      stock: dto.stock
    };

    return await productoRepository.save(productoEntity);
  }
}

module.exports = new ProductoService();
