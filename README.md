# Series

## Requirements

- Docker
- Docker-compose

## Setup

Run `sh scripts/setup_env.sh` to configure environment variables

Run `sh scripts/create-dev-certificates.sh` to create certificates for TLS. On windows, you might need to set environment variable temporarily `MSYS_NO_PATHCONV=1`, for example, `MSYS_NO_PATHCONV=1 sh create-dev-certificates.sh`

Run `docker volume create --name=series_pgdata` to create persistent volume for database. This fixes a problem on windows machine that postgre container would not have proper permissions to access volume defined in docker-compose.yml.

Until official API integrations are done, you'll need to move .mp4 files under env/media folder to be hosted by nginx. These can be accessed without authentication from `https://localhost/<media-path>`. For example, `test.mp4` directly under media-folder could be accessed from `https://localhost/test.mp4`. Media hosted this way will not have authentication check as this is only a temporal solution to have some media available on the app for development purposes.

Move to `server`-folder and run `npm i`

Move to `client`-folder and run `npm i`

### Linting

- Install Prettier and TSLint extensions
- Edit VSCode settings:
  ```
  {
    "editor.formatOnSave": true
    "prettier.tslintIntegration": true,
    "prettier.eslintIntegration": true,
    "prettier.jsxSingleQuote": false,
    "prettier.singleQuote": true,
  }
  ```

## Running in development

In project root folder:

`docker-compose -f env/docker-compose.dev.yml up` to start up development server (add `-d`-flag to end if you wan to run containers in detached mode)

`docker-compose -f env/docker-compose.dev.yml down` to shutdown development server

## Running in production

Production guidelines and configurations coming soon

## Upcoming changes

Planned updates, version numbers and content might change

### v1.0.1

Codebase styling - Add proper linting to project

### v1.0.2

Fixes to main functionalities - proper ordering of series and episodes based on their release dates, alphabetical order

### v1.0.3

Client visual improvements

### v1.0.4

Add guidelines and required configurations for running Series in production

### TBD

- Implement search
- Tests
