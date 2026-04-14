const pool = require('../config/db');

/**
 * Patrón Repository: Se encarga ÚNICAMENTE de hablar con la base de datos (Ejecutar SQL)
 * Equivale a la interfaz JpaRepository de Spring Boot.
 */
class ProductoRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0]; // Retorna el primer producto encontrado o undefined
  }

  async save(productoEntity) {
    await pool.query(
      'INSERT INTO productos (id, nombre, categoria, precioUnitario, stock, unidadMedida) VALUES (?, ?, ?, ?, ?, ?)',
      [productoEntity.id, productoEntity.nombre, productoEntity.categoria, productoEntity.precioUnitario, productoEntity.stock, productoEntity.unidadMedida]
    );
    return productoEntity;
  }

  async update(id, data) {
    await pool.query(
      'UPDATE productos SET nombre = ?, categoria = ?, precioUnitario = ?, stock = ? WHERE id = ?',
      [data.nombre, data.categoria, data.precioUnitario, data.stock, id]
    );
    return { id, ...data };
  }

  async remove(id) {
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    return true;
  }
}

module.exports = new ProductoRepository();
