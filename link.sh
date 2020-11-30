#!/usr/bin/env sh

echo "Link wallpaper"
mkdir --parent --verbose ~/.local/share/wallpaper
ln -f ./wallpaper/RobinBird.jpg ~/.background-image

echo "Link alacritty config"
mkdir --parent --verbose ~/.config
ln -f ./config/alacritty.yml ~/.config/alacritty.yml

echo "Link ion config"
mkdir --parent --verbose ~/.config/ion
ln -f ./config/ion ~/.config/ion/initrc

echo "Link lf config"
mkdir --parent --verbose ~/.config/lf
ln -f ./config/lf ~/.config/lf/lfrc

echo "Link pistol config"
mkdir --parent --verbose ~/.config/pistol
ln -f ./config/pistol ~/.config/pistol/pistol.conf

echo "Link bat config"
mkdir --parent --verbose ~/.config/bat/themes
ln -f ./config/bat/config ~/.config/bat/config
bat cache --build

echo "Link i3 config"
ln -f ./config/i3/status.toml ~/.config/i3/status.toml
ln -f ./config/i3/config ~/.config/i3/config

echo "Reload i3"
i3-msg reload