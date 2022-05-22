#!/usr/bin/env sh

node -v

rm -rf node_modules/

rm -rf cc100/

rm -rf coverage/

rm -rf docs/gen

rm package-lock.json

npm cache verify

npm install

npm i --only=dev

npm test

npm run build

npm run rewrite-changelog

node -v
