# syntax=docker/dockerfile:1.7

# --- Build stage -----------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first so Docker can reuse this layer when only src changes.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY . .

# Vite writes a static SPA to /app/dist
RUN npm run build

# --- Runtime stage ---------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# SPA-aware nginx config with gzip and long-lived asset caching.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static build output (includes public/generated imagery).
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
