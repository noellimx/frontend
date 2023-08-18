FROM node:20.5.0 as prep


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/app
COPY . /usr/app

# FROM prep AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
# RUN pnpm install --prod --frozen-lockfile

FROM prep AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm install --frozen-lockfile
RUN pnpm run build


FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./build.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
