FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm install

WORKDIR /app/apps/web
RUN npm install

WORKDIR /app
COPY . .

RUN npm run build


FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache curl

COPY --from=builder /app ./

EXPOSE 3000 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["npm", "run", "start"]