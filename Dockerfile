# -----------------------
# Base image
# -----------------------
FROM node:18-alpine AS base
RUN npm install -g pnpm@latest
WORKDIR /app

# -----------------------
# Dependencies stage
# -----------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
ENV CI=true
RUN pnpm install --frozen-lockfile

# -----------------------
# Builder stage
# -----------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# -----------------------
# Runner stage (smallest image)
# -----------------------
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Add non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose port and run
EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]
