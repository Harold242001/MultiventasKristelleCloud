/**
 * ventas-service — Refactorizado (Limpieza de Capas)
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/ventas', require('./routes/venta.routes'));
app.get('/health', (req, res) => res.json({ status: 'OK', servicio: 'ventas-service (Capa/Clean Arch)' }));

app.listen(PORT, () => console.log(`\n🟢 [VENTAS - CLEAN ARCH] corriendo en puerto ${PORT}\n`));
