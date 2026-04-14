class CreditoDTO {
  constructor(data) {
    this.cliente = data.cliente;
    this.monto = parseFloat(data.monto);
    this.telefono = data.telefono || '';
  }

  esValido() {
    return this.cliente && !isNaN(this.monto) && this.monto > 0;
  }
}

module.exports = CreditoDTO;
