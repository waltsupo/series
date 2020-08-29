#!/bin/bash

# Functions
# ---------------------------------------------------------
ask_backend_env_variables() {
  read -p "Node environment: (development) " NODE_ENV
  NODE_ENV=${NODE_ENV:-development}

  # Newline
  echo
}

print_backend_env() {
  echo -e "Current backend environment variables:\n"
  echo "NODE_ENV=${NODE_ENV}"

  # Newline
  echo
}

ask_database_env_variables() {
  read -p "Database user: " POSTGRES_USER
  read -p "Database password: " POSTGRES_PASSWORD
  read -p "Database db: " POSTGRES_DB

  # Newline
  echo
}

print_database_env() {
  echo -e "Current database environment variables:\n"
  echo "POSTGRES_USER=${POSTGRES_USER}"
  echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}"
  echo "POSTGRES_DB=${POSTGRES_DB}"

  # Newline
  echo
}

save_env() {
  echo -e "NODE_ENV=${NODE_ENV}
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}" > ../env/backend.env

  echo -e "POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}" > ../env/postgresql.env
}


# ---------------------------------------------------------

echo "Backend environment variables:"
while true; do
  ask_backend_env_variables
  print_backend_env

  read -p "Are these values correct? y/n " backend_confirmation
  case $backend_confirmation in
        [Yy]* ) echo;break;;
        * ) echo;continue;;
  esac
done

echo "Database environment variables:"
while true; do
  ask_database_env_variables
  print_database_env

  read -p "Are these values correct? y/n " database_confirmation
  case $database_confirmation in
        [Yy]* ) echo;break;;
        * ) echo;continue;;
  esac
done

echo "Writing environment files.."
save_env