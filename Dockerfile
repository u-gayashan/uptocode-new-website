FROM node:22-alpine

WORKDIR /app

# Install dependencies first (better layer caching).
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app source.
COPY . .

ENV NODE_ENV=development

# Docker volume mounts + some host filesystems require polling for hot reload.
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=1000
ENV WATCHPACK_POLLING=true

EXPOSE 3000

# Bind to 0.0.0.0 so it works correctly inside Docker.
CMD ["sh", "-c", "npm ci && npm run dev -- --hostname 0.0.0.0 --port 3000"]

