#!/bin/sh

npm run build
cd dist
tar -c -f ../dist.tar *
cd ..

. ./.env
curl http://ttmaths.uk/ -X PUT -H "Authorization: Pages $GIT_PAGES_PASSWORD" -H "Content-Type: application/x-tar" --data-binary @dist.tar
rm dist.tar
