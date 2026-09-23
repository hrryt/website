#!/bin/sh

# cd ..
# git clone --mirror https://git.ttmaths.uk/website.git
# cd website.git
# git --bare update-server-info
# mv hooks/post-update.sample hooks/post-update
# cp ../website/.git/description description
# cd ../website
# git remote add local ../website.git
local=../website.git

cd "$local"
git remote update --prune
cd -

git push local

mkdir stagit
cd stagit
stagit ../"$local"
cp log.html index.html
cp ../stagit.css style.css
cp ../icon.png logo.png
cp ../icon.png favicon.png
cp -r ../"$local" website.git
cd ..

./serve.sh stagit git.ttmaths.uk

rm -rf stagit
