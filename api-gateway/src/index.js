/**
 * API Gateway - Multiventas Krisstelle
 * Punto de entrada único para todos los microservicios.
 * Redirige el tráfico usando http-proxy-middleware.
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────
// Configuración de URLs de microservicios
// Se leen desde variables de entorno (Docker Compose las inyecta)
// ─────────────────────────────────────────────
const VENTAS_SERVICE_URL      = process.env.VENTAS_SERVICE_URL      || 'http://ventas-service:3000';
const INVENTARIO_SERVICE_URL  = process.env.INVENTARIO_SERVICE_URL  || 'http://inventario-service:3000';
const CLIENTES_SERVICE_URL    = process.env.CLIENTES_SERVICE_URL    || 'http://clientes-service:3000';

// ─────────────────────────────────────────────
// Middlewares globales
// ─────────────────────────────────────────────
app.use(cors());                         // Permite solicitudes cross-origin (útil para el frontend)
app.use(morgan('combined'));             // Logger HTTP en formato estándar Apache

// ─────────────────────────────────────────────
// Ruta de salud del API Gateway
// ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'API Gateway - Multiventas Krisstelle',
    timestamp: new Date().toISOString(),
    routes: {
      ventas:     `${VENTAS_SERVICE_URL}`,
      inventario: `${INVENTARIO_SERVICE_URL}`,
      clientes:   `${CLIENTES_SERVICE_URL}`,
    },
  });
});

// ─────────────────────────────────────────────
// Proxy: /ventas  →  ventas-service
// ─────────────────────────────────────────────
app.use(
  '/ventas',
  createProxyMiddleware({
    target: VENTAS_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        console.error(`[GATEWAY] Error al conectar con ventas-service: ${err.message}`);
        res.status(502).json({ error: 'ventas-service no disponible', detalle: err.message });
      },
    },
  })
);

// ─────────────────────────────────────────────
// Proxy: /inventario  →  inventario-service
// ─────────────────────────────────────────────
app.use(
  '/inventario',
  createProxyMiddleware({
    target: INVENTARIO_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/inventario': '' },   // Elimina el prefijo al reenviar
    on: {
      error: (err, req, res) => {
        console.error(`[GATEWAY] Error al conectar con inventario-service: ${err.message}`);
        res.status(502).json({ error: 'inventario-service no disponible', detalle: err.message });
      },
    },
  })
);

// ─────────────────────────────────────────────
// Proxy: /clientes  →  clientes-service
// ─────────────────────────────────────────────
app.use(
  '/clientes',
  createProxyMiddleware({
    target: CLIENTES_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        console.error(`[GATEWAY] Error al conectar con clientes-service: ${err.message}`);
        res.status(502).json({ error: 'clientes-service no disponible', detalle: err.message });
      },
    },
  })
);

// ─────────────────────────────────────────────
// Ruta raíz informativa
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    sistema: 'Multiventas Krisstelle',
    descripcion: 'API Gateway — Sistema de Bodega en Microservicios',
    version: '1.0.0',
    endpoints_disponibles: [
      'GET  /health',
      'GET  /ventas',
      'POST /ventas',
      'GET  /inventario/productos',
      'POST /inventario/productos',
      'GET  /clientes',
      'POST /clientes',
    ],
  });
});

// ─────────────────────────────────────────────
// Manejador de rutas no encontradas
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada en el API Gateway` });
});

// ─────────────────────────────────────────────
// Inicio del servidor
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 [API GATEWAY] Multiventas Krisstelle corriendo en puerto ${PORT}`);
  console.log(`   → ventas-service    : ${VENTAS_SERVICE_URL}`);
  console.log(`   → inventario-service: ${INVENTARIO_SERVICE_URL}`);
  console.log(`   → clientes-service  : ${CLIENTES_SERVICE_URL}\n`);
});
