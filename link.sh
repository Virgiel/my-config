#!/usr/bin/env sh

./font.sh

echo "Copy config"
cat ./config/profile > ~/.profile
. ~/.profile

echo "Link wallpaper"
mkdir --parent --verbose ~/.local/share/wallpaper
ln -v -f ./wallpaper/RobinBird.jpg ~/.background-image

echo "Link alacritty config"
mkdir --parent --verbose ~/.config
ln -v -f ./config/alacritty.yml ~/.config/alacritty.yml

echo "Link i3 config"
ln -v -f ./config/i3/status.toml ~/.config/i3/status.toml
ln -v -f ./config/i3/config ~/.config/i3/config

echo "Reload i3"
i3-msg reload