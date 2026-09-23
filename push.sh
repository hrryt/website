#!/bin/sh

git push local

mkdir stagit
cd stagit
stagit ..
cp log.html index.html
cp ../stagit.css style.css
cp ../icon.png logo.png
cp ../icon.png favicon.png
cp -r ../../website.git website.git
cd ..

./serve.sh stagit git.ttmaths.uk

rm -rf stagit
