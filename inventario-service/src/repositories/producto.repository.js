const pool = require('../../config/db');

/**
 * Patrón Repository: Se encarga ÚNICAMENTE de hablar con la base de datos (Ejecutar SQL)
 * Equivale a la interfaz JpaRepository de Spring Boot.
 */
class ProductoRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
  }

  async save(productoEntity) {
    await pool.query(
      'INSERT INTO productos (id, nombre, categoria, precioUnitario, stock) VALUES (?, ?, ?, ?, ?)',
      [productoEntity.id, productoEntity.nombre, productoEntity.categoria, productoEntity.precioUnitario, productoEntity.stock]
    );
    return productoEntity;
  }
}

module.exports = new ProductoRepository();
