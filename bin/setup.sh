#!/bin/bash

source ./_utils.sh

cd ../
echo ''

print-prefixed "Compressing git repository..."
git gc

print-separator

print-prefixed "Clearing packages..."
rm -rf node_modules

print-separator

print-prefixed "Installing dependencies..."
npm install

print-separator

print-prefixed "Checking packages..."
nsp check --output checkstyle

print-separator

print-prefixed "Finding updates for used packages..."
npm-check --skip-unused

echo ''