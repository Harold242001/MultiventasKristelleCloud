/**
 * DTO (Data Transfer Object) - Simula validar y estructurar los datos que entran.
 */
class ProductoDTO {
    constructor(data) {
      this.nombre = data.nombre;
      this.categoria = data.categoria || 'General';
      this.precioUnitario = parseFloat(data.precioUnitario);
      this.stock = parseInt(data.stock) || 0;
      this.unidadMedida = data.unidadMedida || 'unidad';
    }
  
    esValido() {
      return this.nombre && !isNaN(this.precioUnitario) && this.precioUnitario > 0;
    }
  }
  
  module.exports = ProductoDTO;
