#!/bin/bash

echo "Creating required certificates for development in localhost.."

cd ..
mkdir -p certificates
cd certificates

# CA key and certificate
openssl genrsa -out CA.key 4096
openssl req -x509 -new -nodes -key CA.key -subj "/CN=localhost" -sha256 -days 365 -out CA.crt

# Certificates for servers
openssl genrsa -out nginx.key 4096
openssl req -new -sha256 -key nginx.key -subj "/CN=localhost" -out nginx.csr
openssl x509 -req -in nginx.csr -CA CA.crt -CAkey CA.key -CAcreateserial -out nginx.crt -days 365 -sha256

# Remove unnecessary files
rm nginx.csr
