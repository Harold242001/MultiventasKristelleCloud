const service = require('../services/cliente.service');

class ClienteController {
  async obtenerTodos(req, res) {
    try { res.json({ total: (await service.obtenerTodos()).length, clientes: await service.obtenerTodos() }); } 
    catch (e) { res.status(500).json({ error: e.message }); }
  }
  
  async obtenerPorId(req, res) {
    try { res.json(await service.obtenerPorId(req.params.id)); } 
    catch (e) { res.status(404).json({ error: e.message }); }
  }

  async crear(req, res) {
    try { res.status(201).json({ mensaje: 'Creado', cliente: await service.registrar(req.body) }); } 
    catch (e) { res.status(400).json({ error: e.message }); }
  }

  async actualizar(req, res) {
    try { res.json(await service.actualizar(req.params.id, req.body)); }
    catch (e) { res.status(400).json({ error: e.message }); }
  }

  async eliminar(req, res) {
    try {
      await service.borrar(req.params.id);
      res.json({ mensaje: 'Cliente eliminado' });
    } catch (e) { res.status(404).json({ error: e.message }); }
  }
}
module.exports = new ClienteController();
