#!/bin/bash
rm -rf certs
mkdir -p certs && cd $_
mkcert -install
mkcert -key-file key.pem -cert-file cert.pem \
local.kurly.com \
now.local.kurly.com \
event.local.kurly.com \
localhost \
127.0.0.1 \
::1