const ventaRepository = require('../repositories/venta.repository');
const VentaDTO = require('../models/dto/venta.dto');
const { v4: uuidv4 } = require('uuid');

class VentaService {
  async obtenerTodas() {
    return await ventaRepository.findAll();
  }

  async registrarVenta(datosPost) {
    const dto = new VentaDTO(datosPost);
    
    if (!dto.esValido()) {
      throw new Error('Datos inválidos. Asegúrese de enviar "cliente" y un "total" numérico mayor a 0.');
    }

    const ventaEntity = {
      id: uuidv4(),
      cliente: dto.cliente,
      total: dto.total
    };

    return await ventaRepository.save(ventaEntity);
  }
}

module.exports = new VentaService();
