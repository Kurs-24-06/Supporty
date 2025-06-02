#!/bin/sh
node server/migrations.cjs &
node server/chatserver.cjs &
node server/index.js &
