#!/bin/sh

git push local

mkdir stagit
cd stagit
stagit ..
cp log.html index.html
cp ../stagit.css style.css
cp ../stagit.png logo.png
cp ../stagit.png favicon.png
cp -r ../../website.git website.git
tar -c -f ../stagit.tar *
cd ..

. ./.env
curl http://git.ttmaths.uk/ -X PUT -H "Authorization: Pages $GIT_PAGES_PASSWORD" -H "Content-Type: application/x-tar" --data-binary @stagit.tar
rm stagit.tar
rm -rf stagit
