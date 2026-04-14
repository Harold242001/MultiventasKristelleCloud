const repository = require('../repositories/cliente.repository');
const ClienteDTO = require('../models/dto/cliente.dto');
const { v4: uuidv4 } = require('uuid');

class ClienteService {
  async obtenerTodos() { return await repository.findAll(); }
  
  async obtenerPorId(id) {
    const cliente = await repository.findById(id);
    if (!cliente) throw new Error('Cliente no encontrado');
    return cliente;
  }

  async registrar(datosPost) {
    const dto = new ClienteDTO(datosPost);
    if (!dto.esValido()) throw new Error('Nombre del cliente es obligatorio');
    
    // Generar prefijo 'cli-' para reconocer que es un cliente al depurar
    const entidad = { id: 'cli-' + Math.random().toString(36).substr(2, 9), ...dto };
    return await repository.save(entidad);
  }
}
module.exports = new ClienteService();
