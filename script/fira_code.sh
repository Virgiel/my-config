#!/usr/bin/env bash

mkdir -p "${HOME}/.local/share/fonts"
CHANGE=false
for type in Bold Light Medium Regular Retina; do
    file_path="${HOME}/.local/share/fonts/FiraCode-${type}.ttf"
    file_url="https://github.com/tonsky/FiraCode/blob/master/distr/ttf/FiraCode-${type}.ttf?raw=true"
    if [ ! -e "${file_path}" ]; then
        echo "wget -O $file_path $file_url"
        wget -q -O "${file_path}" "${file_url}"
        CHANGE=true
    else
	    echo "Found existing file $file_path"
    fi;
done

if ( $CHANGE ) then
    echo "Refresh font cache"
    fc-cache -f
fi