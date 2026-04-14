const pool = require('../../config/db');
const { v4: uuidv4 } = require('uuid');

class VentaRepository {
  async findAll() {
    // Para simplificar devolvemos solo la cabecera, pero idealmente se usaría un JOIN
    const [rows] = await pool.query('SELECT * FROM ventas ORDER BY fecha DESC');
    return rows;
  }

  async saveConDetalles(ventaEntity) {
    const connection = await pool.getConnection(); // Usamos transacciones nativas
    try {
      await connection.beginTransaction();
      
      // 1. Guardar la Cabecera de la Venta
      await connection.query(
        'INSERT INTO ventas (id, cliente, total) VALUES (?, ?, ?)',
        [ventaEntity.id, ventaEntity.cliente_nombre, ventaEntity.total]
      );

      // 2. Guardar los Detalles (Productos comprados)
      for (const item of ventaEntity.detalles) {
        await connection.query(
          'INSERT INTO ventas_detalle (id, venta_id, producto, cantidad, precioUnitario, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
          [uuidv4(), ventaEntity.id, item.nombre, item.cantidad, item.precioUnitario, item.subtotal]
        );
      }

      await connection.commit();
      return ventaEntity;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = new VentaRepository();
