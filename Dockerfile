# Fetching the minified node image on apline linux
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG DATABASE_URL
ARG FRONTEND_URL_PROD

# Declaring env
ENV DATABASE_URL $DATABASE_URL
ENV FRONTEND_URL_PROD $FRONTEND_URL_PROD

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=web /apps/web
RUN pnpm deploy --filter=backend --prod /prod/backend

FROM base AS web
COPY . .
COPY --from=build /apps/web /apps/web
WORKDIR /apps/web
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM base AS backend
COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend
EXPOSE 8080
CMD [ "pnpm", "start" ]

