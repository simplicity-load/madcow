#!/bin/sh -x

# args:
#   tmp file output dir (must end with /)
#   cookie (must end with /)

#echo "arg1 $1, arg2 $2" > "log.txt"

[ -z "$1" ] || [ -z "$2" ] && exit

tmpout="$1"
#mkdir -p "$tmpout"

out="$tmpout$2"

#[ -d "$out" ] && exit || mkdir "$out"

#json="${2%/}.json"
#[ -f "$json" ] && mv "$json" "${out}input.json" || exit

# copy madcow to cookie dir
cp madcow/* "$out"
cd "$out"

# run typst
typst compile main.typ output.pdf

# convert to png
pdftoppm -png output.pdf -l 1 output -rx 150 -ry 150
# fix shitty output of pdftoppm
mv output-1.png output.png

pwd

rm *.typ *.json
