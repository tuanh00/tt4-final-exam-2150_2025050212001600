# ─── Build React App ───────────────────────────────────────
FROM node:lts-alpine AS builder
WORKDIR /app

# Copy package manifests and install deps
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# ─── Serve with Nginx ─────────────────────────────────────
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=builder /app/build ./

# Nginx config to proxy /api → api:8080
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
