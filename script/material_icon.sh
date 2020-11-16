#!/usr/bin/env bash

mkdir -p "${HOME}/.local/share/fonts"

file_path="${HOME}/.local/share/fonts/materialdesignicons-webfont.ttf"
file_url="https://gist.github.com/draoncc/3c20d8d4262892ccd2e227eefeafa8ef/raw/3e6e12c213fba1ec28aaa26430c3606874754c30/MaterialIcons-Regular-for-inline.ttf"
if [ ! -e "${file_path}" ]; then
    echo "wget -O $file_path $file_url"
    wget -O "${file_path}" "${file_url}"
else
echo "Found existing file $file_path"
fi;

fc-cache -f