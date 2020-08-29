#!/bin/bash

# Functions

ask_env_variables() {
  # Port server will run in
  read -p "port: (3000)" PORT
  PORT=${PORT:-3000}

  read -p "Node environment: (development)" NODE_ENV
  NODE_ENV=${NODE_ENV:-development}

  # Newline
  echo
}

print_env() {
  echo -e "Current environment variables:\n"
  echo "PORT=${PORT}"
  echo "NODE_ENV=${NODE_ENV}"

  # Newline
  echo
}

save_env() {
   echo -e "PORT=${PORT}\nNODE_ENV=${NODE_ENV}" > ../.env
}

# Script start

echo "Setting up env variables.."

while true; do
  ask_env_variables
  print_env

  read -p "Are these values correct? y/n" confirmation
  case $confirmation in
        [Yy]* ) save_env;break;;
        * ) continue;;
  esac
done
