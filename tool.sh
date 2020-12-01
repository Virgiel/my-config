#!/usr/bin/env sh
# bottom is on nix packages unstable
for app in emulsion bottom
do
 cargo install $app
done