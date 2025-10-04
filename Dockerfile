# -----------------------
# Base image
# -----------------------
FROM node:18-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@latest

# -----------------------
# Dependencies stage
# -----------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
ENV CI=true
# Limit network concurrency to save memory on low-RAM EC2
RUN pnpm install --frozen-lockfile --network-concurrency 1

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

# Copy only necessary build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=deps /app/node_modules ./node_modules 

# Expose port and run
EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]
