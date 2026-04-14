const pool = require('../../config/db');

class VentaRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM ventas ORDER BY fecha DESC');
    return rows;
  }

  async save(ventaEntity) {
    await pool.query(
      'INSERT INTO ventas (id, cliente, total) VALUES (?, ?, ?)',
      [ventaEntity.id, ventaEntity.cliente, ventaEntity.total]
    );
    return ventaEntity;
  }
}

module.exports = new VentaRepository();
