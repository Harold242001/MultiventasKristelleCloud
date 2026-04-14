CREATE DATABASE IF NOT EXISTS multiventas_db;
USE multiventas_db;

-- Tabla de Inventario
CREATE TABLE IF NOT EXISTS productos (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    precioUnitario DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    unidad VARCHAR(20) DEFAULT 'unidad',
    fechaIngreso DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Ventas
CREATE TABLE IF NOT EXISTS ventas (
    id VARCHAR(36) PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'completada',
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Detalle de Ventas
CREATE TABLE IF NOT EXISTS ventas_detalle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id VARCHAR(36) NOT NULL,
    producto VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(100),
    fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos datos de prueba iniciales
INSERT INTO productos (id, nombre, categoria, precioUnitario, stock, unidad) VALUES 
('prod-1', 'Arroz Costeño 1kg', 'Víveres', 4.50, 100, 'bolsa'),
('prod-2', 'Aceite 1L', 'Aceites', 8.00, 50, 'botella'),
('prod-3', 'Azúcar 2kg', 'Endulzantes', 5.50, 75, 'bolsa');

INSERT INTO clientes (id, nombre, dni, telefono, email) VALUES
('cli-100', 'Rosa Mamani', '12345678', '987654321', 'rosa@mail.com'),
('cli-101', 'Juan Pérez', '87654321', '912345678', 'juan@mail.com');
