const pool = require('../config/db');

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

  async update(id, data) {
    await pool.query(
      'UPDATE clientes SET nombre = ?, dni = ?, telefono = ?, email = ? WHERE id = ?',
      [data.nombre, data.dni, data.telefono, data.email, id]
    );
    return { id, ...data };
  }

  async remove(id) {
    await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
    return true;
  }
}
module.exports = new ClienteRepository();
