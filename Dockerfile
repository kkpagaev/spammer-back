FROM node:16 as build-stage

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm 

WORKDIR /build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY ./ .
RUN pnpm run build

FROM node:16 as production-stage

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm 

WORKDIR /app
COPY --chown=node:node --from=build-stage /build/package.json /app/

RUN pnpm install -P

ENV NODE_ENV production
USER node
COPY .env.prod .env

COPY --chown=node:node --from=build-stage /build/dist /app/dist/

EXPOSE 5000

CMD ["node", "/app/dist/index.js"]
