#!/usr/bin/env bash

echo "Set up configs"
./script/fira_code.sh
mkdir --parent --verbose ~/.local/share/wallpaper
cat ./wallpaper/RobinBird.jpg > ~/.local/share/wallpaper/RobinBird.jpg
cat ./config/profile > ~/.profile
. ~/.profile
mkdir -p -v ~/.config/i3
cat ./config/status.toml > ~/.config/i3/status.toml
mkdir -p -v ~/.config/alacritty
cat ./config/alacritty.yml > ~/.config/alacritty.yml
cat ./config/regolith > ~/.config/regolith/Xresources
regolith-look refresh