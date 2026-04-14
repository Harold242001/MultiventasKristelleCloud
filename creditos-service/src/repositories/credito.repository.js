const pool = require('../../config/db');

class CreditoRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM creditos ORDER BY fechaCredito DESC');
    return rows;
  }

  async save(creditoEntity) {
    await pool.query(
      'INSERT INTO creditos (id, cliente, telefono, monto, saldoPendiente) VALUES (?, ?, ?, ?, ?)',
      [creditoEntity.id, creditoEntity.cliente, creditoEntity.telefono, creditoEntity.monto, creditoEntity.monto]
    );
    return creditoEntity;
  }
}

module.exports = new CreditoRepository();
