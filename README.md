# Series

## Requirements

- Docker
- Docker-compose

## Setup

Run `scripts/setup_backend_env.sh` to configure environment variables

Run `scripts/create-dev-certificates.sh` to create certificates for TLS. On windows, you might need to set environment variable temporarily `MSYS_NO_PATHCONV=1`, for example, `MSYS_NO_PATHCONV=1 sh create-dev-certificates.sh`

## Running in development

`docker-compose -f env/docker-compose.dev.yml up -d` to start up development server

`docker-compose -f env/docker-compose.dev.yml down` to shutdown development server
