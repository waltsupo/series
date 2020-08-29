#!/bin/bash

# Functions
# ---------------------------------------------------------
ask_env_variables() {
  read -p "Node environment: (development) " NODE_ENV
  NODE_ENV=${NODE_ENV:-development}

  # Newline
  echo
}

print_env() {
  echo -e "Current environment variables:\n"
  echo "NODE_ENV=${NODE_ENV}"

  # Newline
  echo
}

save_env() {
   echo -e "NODE_ENV=${NODE_ENV}" > ../env/backend.env
}


# ---------------------------------------------------------

echo "Setting up env variables.."

while true; do
  ask_env_variables
  print_env

  read -p "Are these values correct? y/n " confirmation
  case $confirmation in
        [Yy]* ) save_env;break;;
        * ) continue;;
  esac
done
