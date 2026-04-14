const ventaRepository = require('../repositories/venta.repository');
const VentaDTO = require('../models/dto/venta.dto');
const { v4: uuidv4 } = require('uuid');

class VentaService {
  async obtenerTodas() {
    return await ventaRepository.findAll();
  }

  // AQUÍ SUCEDE LA MAGIA DE MICROSERVICIOS
  async registrarVenta(datosPost) {
    const dto = new VentaDTO(datosPost);
    if (!dto.esValido()) throw new Error('Falta cliente_id o el array de productos.');

    // 1. CONSULTA AL MICROSERVICIO DE CLIENTES
    const urlClientes = process.env.CLIENTES_SERVICE_URL || 'http://clientes-service:3000';
    const resCli = await fetch(`${urlClientes}/clientes/${dto.cliente_id}`);
    if (!resCli.ok) throw new Error(`El cliente ID ${dto.cliente_id} no existe en el sistema de clientes.`);
    const clienteInfo = await resCli.json();

    // 2. CONSULTA AL MICROSERVICIO DE INVENTARIOS POR CADA PRODUCTO
    const urlInventario = process.env.INVENTARIO_SERVICE_URL || 'http://inventario-service:3000';
    let GranTotalVenta = 0;
    const detalles_a_guardar = [];

    for (const prod of dto.productos) {
      // Pedir data real del producto al inventario
      const resInv = await fetch(`${urlInventario}/productos/${prod.producto_id}`);
      if (!resInv.ok) throw new Error(`El producto ID ${prod.producto_id} no existe devolvió 404.`);
      const prodInfo = await resInv.json();

      // Validación de Stock
      if (prodInfo.stock < prod.cantidad) {
        throw new Error(`Stock insuficiente. Solo hay ${prodInfo.stock} unidades de ${prodInfo.nombre}.`);
      }

      // Cálculo del subtotal basado en el precio REAL del inventario, no del cliente
      const sub = parseFloat(prodInfo.precioUnitario) * prod.cantidad;
      GranTotalVenta += sub;
      
      detalles_a_guardar.push({
        producto_id: prodInfo.id,
        nombre: prodInfo.nombre,
        cantidad: prod.cantidad,
        precioUnitario: prodInfo.precioUnitario,
        subtotal: sub
      });
    }

    // 3. Crear Entidad Consolidada con cabecera y detalles para la BD
    const ventaEntity = {
      id: uuidv4(),
      cliente_nombre: clienteInfo.nombre, // Jalado puro desde clientes-service
      total: GranTotalVenta,              // Sumado dinámicamente desde inventario-service
      detalles: detalles_a_guardar
    };

    return await ventaRepository.saveConDetalles(ventaEntity);
  }
}

module.exports = new VentaService();
