# ---------- Base ----------
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# ---------- Deps (dev) ----------
FROM base AS prod-deps
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch --frozen-lockfile 

# ---------- Build ----------
FROM prod-deps AS build
COPY prisma ./prisma
COPY tsconfig*.json ./
WORKDIR /src
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build 

# ---------- Base ----------
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# ---------- Deps (dev) ----------
FROM base AS prod-deps
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch --frozen-lockfile 

# ---------- Build ----------
FROM prod-deps AS build
COPY prisma ./prisma
COPY tsconfig*.json ./
WORKDIR /src
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build 

# ---------- Runtime ----------
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/dist ./dist
COPY --from=build /src/prisma ./prisma

COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5600
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main.js"]


