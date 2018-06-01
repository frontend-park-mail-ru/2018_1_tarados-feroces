#!/bin/sh
cd dist

for i in *.js *.css; do
        cat $i | gzip -9 > $i.gz
        chown --reference=$i $i.gz
        touch -r $i $i.gz
done

cd static/imgs
for i in *.png *.jpg *.jpeg; do
        cat $i | gzip -9 > $i.gz
        chown --reference=$i $i.gz
        touch -r $i $i.gz
done

cd ..
for i in *.mp4; do
        cat $i | gzip -9 > $i.gz
        chown --reference=$i $i.gz
        touch -r $i $i.gz
done
