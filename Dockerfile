FROM node:22-alpine

WORKDIR /app

# Install dependencies first (better layer caching).
COPY package.json package-lock.json ./
RUN npm ci \
	--no-audit \
	--no-fund \
	--fetch-retries=5 \
	--fetch-retry-factor=2 \
	--fetch-retry-mintimeout=20000 \
	--fetch-retry-maxtimeout=120000

# Copy the rest of the app source.
COPY . .

ENV NODE_ENV=development

# Docker volume mounts + some host filesystems require polling for hot reload.
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=1000
ENV WATCHPACK_POLLING=true

EXPOSE 3000

# Bind to 0.0.0.0 so it works correctly inside Docker.
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]

