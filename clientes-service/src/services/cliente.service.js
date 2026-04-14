const repository = require('../repositories/cliente.repository');
const ClienteDTO = require('../models/dto/cliente.dto');

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
    const entidad = { id: 'cli-' + Math.random().toString(36).substr(2, 9), ...dto };
    return await repository.save(entidad);
  }

  async actualizar(id, datos) {
    await this.obtenerPorId(id);
    return await repository.update(id, datos);
  }

  async borrar(id) {
    await this.obtenerPorId(id);
    return await repository.remove(id);
  }
}
module.exports = new ClienteService();
