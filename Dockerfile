
FROM node:20-alpine AS base
WORKDIR /app


COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY public ./public
COPY styles ./styles
COPY src ./src
COPY server.js .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=2s --start-period=10s --retries=3 CMD \
  node -e "fetch(`http://127.0.0.1:${process.env.PORT||3000}/health`).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "start"]
