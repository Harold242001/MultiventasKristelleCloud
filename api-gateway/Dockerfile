# ─────────────────────────────────────────────
# Dockerfile — api-gateway
# Multiventas Krisstelle
# ─────────────────────────────────────────────

# Imagen base oficial de Node.js (versión LTS Alpine para menor tamaño)
FROM node:18-alpine

# Metadata del contenedor
LABEL maintainer="Multiventas Krisstelle"
LABEL description="API Gateway — Sistema de Bodega en Microservicios"

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero (optimiza caché de Docker)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código fuente
COPY . .

# Puerto expuesto por el contenedor
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["node", "src/index.js"]
