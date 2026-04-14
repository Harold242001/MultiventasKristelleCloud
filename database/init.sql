-- ═══════════════════════════════════════════════════════════════════
-- init.sql — Multiventas Krisstelle
-- Inicialización de la base de datos MySQL
-- ═══════════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS multiventas_db;
USE multiventas_db;

-- Tabla de Productos (Servicio Inventario)
CREATE TABLE IF NOT EXISTS productos (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    precioUnitario DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    unidadMedida VARCHAR(20) DEFAULT 'unidad'
);

-- Tabla de Ventas - Cabecera (Servicio Ventas)
CREATE TABLE IF NOT EXISTS ventas (
    id VARCHAR(36) PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'completado'
);

-- Tabla de Ventas - Detalle (Servicio Ventas)
CREATE TABLE IF NOT EXISTS ventas_detalle (
    id VARCHAR(36) PRIMARY KEY,
    venta_id VARCHAR(36),
    producto VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE
);

-- Tabla de Clientes (Servicio Clientes)
CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(100),
    fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);

