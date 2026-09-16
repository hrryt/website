#!/bin/sh

cd "$1"
tar -c -f ../archive.tar *
cd ..

. ./.env
curl "http://$2" -X PUT -H "Authorization: Pages $GIT_PAGES_PASSWORD" -H "Content-Type: application/x-tar" --data-binary @archive.tar

rm archive.tar
