class ClienteDTO {
  constructor(data) {
    this.nombre = data.nombre;
    this.dni = data.dni || null;
    this.telefono = data.telefono || null;
    this.email = data.email || null;
  }
  esValido() { return this.nombre && this.nombre.trim().length > 0; }
}
module.exports = ClienteDTO;
