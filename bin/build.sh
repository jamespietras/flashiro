#!/bin/bash

source ./_utils.sh

cd ../
echo ''

print-prefixed "Building production bundle..."
print-separator
webpack --config webpack.config.production.babel.js

echo ''