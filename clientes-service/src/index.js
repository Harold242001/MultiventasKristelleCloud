/**
 * clientes-service — Microservicio de Clientes (Arquitectura por Clases)
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/clientes', require('./routes/cliente.routes'));
app.get('/health', (req, res) => res.json({ status: 'OK', servicio: 'clientes-service' }));

app.listen(PORT, () => console.log(`\n👨‍💼 [CLIENTES] corriendo en puerto ${PORT}\n`));
