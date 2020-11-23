#!/usr/bin/env sh

echo "Install FiraCode and Material icons"

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
file_path="${HOME}/.local/share/fonts/materialdesignicons-webfont.ttf"
file_url="https://gist.github.com/draoncc/3c20d8d4262892ccd2e227eefeafa8ef/raw/3e6e12c213fba1ec28aaa26430c3606874754c30/MaterialIcons-Regular-for-inline.ttf"
if [ ! -e "${file_path}" ]; then
    echo "wget -O $file_path $file_url"
    wget -q -O "${file_path}" "${file_url}"
    CHANGE=true
else
echo "Found existing file $file_path"
fi;


if ( $CHANGE ) then
    echo "Refresh font cache"
    fc-cache -f
fi