# 🏪 Multiventas Krisstelle — Sistema de Bodega en Microservicios

> Sistema de gestión de bodega construido con arquitectura de microservicios, Node.js, Express y Docker.

---

## 📐 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENTE / POSTMAN                            │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTP Requests
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (Puerto 3000)                         │
│                  Node.js + Express + http-proxy-middleware           │
│                                                                      │
│  /ventas     ──────────────────────────────────────────────────────► │
│  /inventario ──────────────────────────────────────────────────────► │
│  /creditos   ──────────────────────────────────────────────────────► │
└────────────┬─────────────────────┬──────────────────────┬───────────┘
             │                     │                      │
             ▼                     ▼                      ▼
┌────────────────────┐ ┌────────────────────┐ ┌────────────────────────┐
│   ventas-service   │ │inventario-service  │ │   creditos-service     │
│     Puerto 3001    │ │    Puerto 3002      │ │      Puerto 3003       │
│   Node.js/Express  │ │  Node.js/Express   │ │    Node.js/Express     │
│   Datos en memoria │ │  Datos en memoria   │ │   Datos en memoria     │
└────────────────────┘ └────────────────────┘ └────────────────────────┘
             │                     │                      │
             └─────────────────────┴──────────────────────┘
                           Red Docker Interna
                         (multiventas-network)
```

### 🔑 Principios aplicados
- **Separación de responsabilidades**: cada microservicio maneja su propio dominio.
- **Comunicación REST/JSON**: todos se comunican vía HTTP internamente.
- **Punto de entrada único**: el API Gateway es el único componente expuesto.
- **Red interna Docker**: los microservicios se resuelven por nombre de servicio.

---

## 📁 Estructura del Proyecto

```
multiventas-cloud/
│
├── api-gateway/
│   ├── src/
│   │   └── index.js          ← Lógica del gateway + proxies
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── ventas-service/
│   ├── src/
│   │   └── index.js          ← CRUD de ventas (datos en memoria)
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── inventario-service/
│   ├── src/
│   │   └── index.js          ← CRUD de productos + control de stock
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── creditos-service/
│   ├── src/
│   │   └── index.js          ← CRUD de créditos + registro de pagos
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml         ← Orquestación de todos los servicios
└── README.md
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- [Postman](https://www.postman.com/) (opcional, para pruebas)

### 1. Clonar o ubicarse en el proyecto
```bash
cd multiventas-cloud
```

### 2. Levantar todos los servicios (primera vez)
```bash
docker-compose up --build
```

### 3. Levantar en modo background (daemon)
```bash
docker-compose up -d --build
```

### 4. Ver logs en tiempo real
```bash
docker-compose logs -f
```

### 5. Detener todos los servicios
```bash
docker-compose down
```

### 6. Ver estado de contenedores
```bash
docker-compose ps
```

---

## 🌐 Puertos y Servicios

| Servicio             | Puerto externo | Puerto interno | URL base                         |
|----------------------|---------------|----------------|----------------------------------|
| **API Gateway**      | 3000          | 3000           | `http://localhost:3000`          |
| **ventas-service**   | 3001          | 3000           | `http://localhost:3001` (directo)|
| **inventario-service**| 3002         | 3000           | `http://localhost:3002` (directo)|
| **creditos-service** | 3003          | 3000           | `http://localhost:3003` (directo)|

> **💡 Buena práctica**: Siempre usa el API Gateway (`localhost:3000`) en producción. Los puertos directos son solo para debugging.

---

## 📋 Endpoints Disponibles

### 🟢 Ventas — vía API Gateway

#### Listar todas las ventas
```http
GET http://localhost:3000/ventas
```
**Respuesta:**
```json
{
  "total": 2,
  "ventas": [
    {
      "id": "uuid",
      "cliente": "María López",
      "productos": [{ "nombre": "Arroz x 5kg", "cantidad": 2, "precioUnitario": 12.50 }],
      "total": 25.00,
      "fecha": "2025-01-10T08:30:00Z",
      "estado": "completada"
    }
  ]
}
```

#### Registrar una nueva venta
```http
POST http://localhost:3000/ventas
Content-Type: application/json

{
  "cliente": "Ana García",
  "productos": [
    { "nombre": "Fideos 500g", "cantidad": 2, "precioUnitario": 3.20 },
    { "nombre": "Aceite 1L",   "cantidad": 1, "precioUnitario": 8.00 }
  ]
}
```
**Respuesta:**
```json
{
  "mensaje": "Venta registrada exitosamente",
  "venta": {
    "id": "nuevo-uuid",
    "cliente": "Ana García",
    "total": 14.40,
    "estado": "completada"
  }
}
```

---

### 🔵 Inventario — vía API Gateway

#### Listar todos los productos
```http
GET http://localhost:3000/inventario/productos
```

#### Listar con filtros (opcionales)
```http
GET http://localhost:3000/inventario/productos?categoria=Granos
GET http://localhost:3000/inventario/productos?stockMin=50
```

#### Agregar un nuevo producto
```http
POST http://localhost:3000/inventario/productos
Content-Type: application/json

{
  "nombre": "Leche Gloria 1L",
  "categoria": "Lácteos",
  "precioUnitario": 4.50,
  "stock": 30,
  "unidad": "caja"
}
```

#### Actualizar stock de un producto
```http
PATCH http://localhost:3001/productos/{id}/stock
Content-Type: application/json

{
  "cantidad": 10,
  "operacion": "entrada"
}
```
> `operacion` puede ser `"entrada"` (suma stock) o `"salida"` (resta stock)

---

### 🟡 Créditos — vía API Gateway

#### Listar todas las deudas
```http
GET http://localhost:3000/creditos
```

#### Listar con filtros (opcionales)
```http
GET http://localhost:3000/creditos?estado=pendiente
GET http://localhost:3000/creditos?cliente=Rosa
```

#### Registrar un nuevo crédito
```http
POST http://localhost:3000/creditos
Content-Type: application/json

{
  "cliente": "Pedro Flores",
  "dni": "44556677",
  "telefono": "955443322",
  "descripcion": "Compra semanal al crédito",
  "monto": 75.50,
  "fechaVencimiento": "2025-02-28"
}
```

#### Registrar un pago (directo al servicio)
```http
PATCH http://localhost:3003/creditos/{id}/pago
Content-Type: application/json

{
  "montoPago": 30.00
}
```

---

### ❤️ Health Checks

```http
GET http://localhost:3000/health       ← API Gateway
GET http://localhost:3001/health       ← ventas-service
GET http://localhost:3002/health       ← inventario-service
GET http://localhost:3003/health       ← creditos-service
```

---

## 🔧 Variables de Entorno

El API Gateway acepta estas variables (configuradas en `docker-compose.yml`):

| Variable                | Valor por defecto              | Descripción                     |
|-------------------------|--------------------------------|---------------------------------|
| `VENTAS_SERVICE_URL`    | `http://ventas-service:3000`   | URL del microservicio de ventas  |
| `INVENTARIO_SERVICE_URL`| `http://inventario-service:3000`| URL del microservicio de inventario |
| `CREDITOS_SERVICE_URL`  | `http://creditos-service:3000` | URL del microservicio de créditos |
| `PORT`                  | `3000`                         | Puerto del servidor              |

---

## 🧪 Colección Postman — Importar

Crea una nueva colección en Postman con estas solicitudes de prueba rápida:

1. `GET  localhost:3000/`                         → Info del sistema
2. `GET  localhost:3000/health`                   → Estado del gateway
3. `GET  localhost:3000/ventas`                   → Listar ventas
4. `POST localhost:3000/ventas`                   → Nueva venta
5. `GET  localhost:3000/inventario/productos`     → Listar productos
6. `POST localhost:3000/inventario/productos`     → Nuevo producto
7. `GET  localhost:3000/creditos`                 → Listar créditos
8. `POST localhost:3000/creditos`                 → Nuevo crédito

---

## 📦 Stack Tecnológico

| Tecnología           | Versión  | Rol                                  |
|----------------------|----------|--------------------------------------|
| Node.js              | 18 LTS   | Runtime de JavaScript del servidor   |
| Express.js           | ^4.18    | Framework web para los microservicios |
| http-proxy-middleware| ^2.0     | Proxy inverso en el API Gateway      |
| morgan               | ^1.10    | Logger de peticiones HTTP            |
| cors                 | ^2.8     | Habilitar Cross-Origin Resource Sharing |
| uuid                 | ^9.0     | Generación de IDs únicos             |
| Docker               | latest   | Contenerización de servicios         |
| Docker Compose       | v3.9     | Orquestación local                   |

---

## 🎓 Notas Académicas

Este proyecto fue desarrollado para demostrar:

1. **Patrón API Gateway**: punto de entrada único que desacopla los clientes de los microservicios.
2. **Comunicación síncrona REST**: los servicios exponen APIs JSON estándar.
3. **Contenerización**: cada servicio corre en su propio contenedor Docker aislado.
4. **Red de servicios**: Docker Compose crea una red bridge privada para la comunicación interna.
5. **Separación de dominios**: ventas, inventario y créditos son contextos acotados independientes.
6. **Datos en memoria**: para simplificar la demostración sin base de datos (los datos se reinician con el contenedor).

---

## 👤 Autor

**Sistema Multiventas Krisstelle**  
Arquitectura de Microservicios — Node.js + Docker  
