# Series-backend

## Technologies / Libraries

- Node with Express
- Sequelize to handle database connection
- TypeScript

## Requirements

- Node LTS
- Docker, docker-compose

## Setup

Run `scripts/setup_env.sh` to configure environment variables

Run `scripts/create-dev-certificates.sh` to create certificates for TLS. On windows, you might need to set environment variable temporarily `MSYS_NO_PATHCONV=1`, for example, `MSYS_NO_PATHCONV=1 sh create-dev-certificates.sh`

## Running in development

`npm start` to start up development server
