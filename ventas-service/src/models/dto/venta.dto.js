class VentaDTO {
  constructor(data) {
    this.cliente = data.cliente;
    this.total = parseFloat(data.total);
  }

  esValido() {
    return this.cliente && !isNaN(this.total) && this.total > 0;
  }
}

module.exports = VentaDTO;
