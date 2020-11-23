#!/usr/bin/env sh

./font.sh

echo "Copy config"
cat ./config/profile > ~/.profile
. ~/.profile

echo "Link wallpaper"
mkdir --parent --verbose ~/.local/share/wallpaper
ln -f ./wallpaper/RobinBird.jpg ~/.background-image

echo "Link alacritty config"
mkdir --parent --verbose ~/.config
ln -f ./config/alacritty.yml ~/.config/alacritty.yml

echo "Link lf config"
mkdir --parent --verbose ~/.config/lf
ln -f ./config/lfrc ~/.config/lf/lfrc

echo "Link bat config"
mkdir --parent --verbose ~/.config/bat/themes
ln -f ./config/bat ~/.config/bat/config
ln -f ./config/gruvbox.tmTheme ~/.config/bat/themes/gruvbox.tmTheme
bat cache --build

echo "Link i3 config"
ln -f ./config/i3/status.toml ~/.config/i3/status.toml
ln -f ./config/i3/config ~/.config/i3/config

echo "Reload i3"
i3-msg reload