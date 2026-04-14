class VentaDTO {
  constructor(data) {
    this.cliente_id = data.cliente_id;
    this.productos = data.productos; 
  }

  esValido() {
    return this.cliente_id && Array.isArray(this.productos) && this.productos.length > 0;
  }
}

module.exports = VentaDTO;
