
FROM node:20-alpine AS base
WORKDIR /app


COPY package*.json ./
RUN npm ci --only=production


COPY public ./public
COPY styles ./styles
COPY src ./src
COPY server.js .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=2s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/health || exit 1

CMD ["npm", "start"]
