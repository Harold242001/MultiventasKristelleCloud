const creditoRepository = require('../repositories/credito.repository');
const CreditoDTO = require('../models/dto/credito.dto');
const { v4: uuidv4 } = require('uuid');

class CreditoService {
  async obtenerTodos() {
    return await creditoRepository.findAll();
  }

  async registrarCredito(datosPost) {
    const dto = new CreditoDTO(datosPost);
    
    if (!dto.esValido()) {
      throw new Error('Datos inválidos. Cliente y monto son obligatorios.');
    }

    const creditoEntity = {
      id: uuidv4(),
      cliente: dto.cliente,
      telefono: dto.telefono,
      monto: dto.monto
    };

    return await creditoRepository.save(creditoEntity);
  }
}

module.exports = new CreditoService();
