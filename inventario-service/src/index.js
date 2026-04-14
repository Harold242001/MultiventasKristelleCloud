/**
 * inventario-service — MAIN (Refactorizado con Arquitectura por Capas)
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Importar el Router (Equivalente al Dispatcher en Java)
const productoRoutes = require('./routes/producto.routes');

// Vincular rutas
app.use('/productos', productoRoutes);

// Health Check
app.get('/health', (req, res) => res.json({ status: 'OK', servicio: 'inventario-service (Arquitecura Capas)' }));

// Start Server
app.listen(PORT, () => {
  console.log(`\n🔵 [INVENTARIO - CLEAN ARCH] corriendo en puerto ${PORT}\n`);
});
