#!/bin/bash

# Functions
# ---------------------------------------------------------

create_ca_certificates () {
  # CA key and certificate
  openssl genrsa -out CA.key 4096
  openssl req -x509 -new -nodes -key CA.key -subj "/CN=localhost" -sha256 -days 365 -out CA.crt
  openssl rand -hex 16 > CA.srl
}

create_service_certificates() {
  SERVICE_NAME=$1

  openssl genrsa -out ${SERVICE_NAME}.key 4096
  openssl req -new -sha256 -key ${SERVICE_NAME}.key -subj "/CN=localhost" -out ${SERVICE_NAME}.csr
  openssl x509 -req -in ${SERVICE_NAME}.csr -CA CA.crt -CAkey CA.key -CAserial CA.srl -out ${SERVICE_NAME}.crt -days 365 -sha256

  rm ${SERVICE_NAME}.csr
}

# ---------------------------------------------------------

echo "Creating required certificates for development in localhost.."

# Move to certificates folder
mkdir -p ../certificates
cd ../certificates

create_ca_certificates
create_service_certificates nginx