# =========================
# Build Stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy web package files separately first for caching
COPY apps/web/package*.json ./apps/web/

# Install root dependencies
RUN npm install

# Install frontend dependencies
WORKDIR /app/apps/web
RUN npm install

# Back to root
WORKDIR /app

# Copy all files
COPY . .

# Build frontend
RUN npm run build

# =========================
# Production Stage
# =========================
FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache curl

# Copy built application
COPY --from=builder /app ./

EXPOSE 3000 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["npm", "run", "start"]