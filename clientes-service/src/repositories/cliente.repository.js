const pool = require('../../config/db');

class ClienteRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY fechaRegistro DESC');
    return rows;
  }
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0]; 
  }
  async save(entidad) {
    await pool.query(
      'INSERT INTO clientes (id, nombre, dni, telefono, email) VALUES (?, ?, ?, ?, ?)',
      [entidad.id, entidad.nombre, entidad.dni, entidad.telefono, entidad.email]
    );
    return entidad;
  }
}
module.exports = new ClienteRepository();
