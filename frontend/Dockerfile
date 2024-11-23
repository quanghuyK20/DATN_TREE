# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json*  ./
# RUN npm install --package-lock-only
RUN npm config set timeout 300000
# RUN npm install
# RUN npm install sass
# RUN npm install uuid@7


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner

ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 reactjs

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

FROM deps AS development
RUN npm run
COPY . .

EXPOSE 3000

# Running the app
CMD "npm" "run" "start"
