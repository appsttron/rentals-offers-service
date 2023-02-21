FROM node:16 AS development
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build
FROM node:16 AS production
ARG NODE_AUTH_TOKEN
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --only=production --omit=dev
COPY --from=development ./app/dist ./dist
CMD [ "node", "dist/main"]