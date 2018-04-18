#!/bin/bash

source ./_utils.sh

cd ../
echo ''

print-prefixed "Starting development environment..."
print-separator
webpack-dev-server --config webpack.config.development.babel.js