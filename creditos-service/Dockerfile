# ─────────────────────────────────────────────
# Dockerfile — creditos-service
# Multiventas Krisstelle
# ─────────────────────────────────────────────

FROM node:18-alpine

LABEL maintainer="Multiventas Krisstelle"
LABEL description="Microservicio de Créditos"

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "src/index.js"]
