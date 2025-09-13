#!/bin/sh
set -e

# Si querés correr migraciones:
pnpm exec prisma migrate deploy || true

exec "$@"
