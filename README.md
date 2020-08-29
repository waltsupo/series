# Series

## Requirements

- Docker
- Docker-compose

## Setup

Run `scripts/setup_env.sh` to configure environment variables

Run `scripts/create-dev-certificates.sh` to create certificates for TLS. On windows, you might need to set environment variable temporarily `MSYS_NO_PATHCONV=1`, for example, `MSYS_NO_PATHCONV=1 sh create-dev-certificates.sh`

Run `docker volume create --name=series_pgdata` to create persistent volume for database. This fixes a problem on windows machine that postgre container would not have proper permissions to access volume defined in docker-compose.yml.

## Running in development

`docker-compose -f env/docker-compose.dev.yml up -d` to start up development server

`docker-compose -f env/docker-compose.dev.yml down` to shutdown development server
