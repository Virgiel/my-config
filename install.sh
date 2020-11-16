#!/usr/bin/env bash

echo "Set up regolith"
sudo add-apt-repository -y ppa:regolith-linux/release
sudo apt -q dist-upgrade

echo "Set up FiraCode"
./script/fira_code.sh

echo "Set up wallpaper"
mkdir --parent --verbose ~/.local/share/wallpaper
cat ./wallpaper/RobinBird.jpg > ~/.local/share/wallpaper/RobinBird.jpg

echo "Set up profile"
cat ./config/profile > ~/.profile
. ~/.profile

echo "Set up cargo"
./script/rust.sh

echo "Set up i3status-rs"
sudo apt -qq install libdbus-1-dev
cargo install --git https://github.com/greshake/i3status-rust --tag v0.14.2 i3status-rs
https://gist.github.com/draoncc/3c20d8d4262892ccd2e227eefeafa8ef/raw/3e6e12c213fba1ec28aaa26430c3606874754c30/MaterialIcons-Regular-for-inline.ttf
mkdir -p -v ~/.config/i3
cat ./config/status.toml > ~/.config/i3/status.toml

echo "Set up alacritty"
sudo apt -qq install cmake pkg-config libfreetype6-dev libfontconfig1-dev libxcb-xfixes0-dev python3
cargo install --git https://github.com/alacritty/alacritty --tag v0.6.0-rc2 
mkdir -p -v ~/.config/alacritty
cat ./config/alacritty.yml > ~/.config/alacritty.yml
sudo update-alternatives --install /usr/bin/x-terminal-emulator x-terminal-emulator ~/.cargo/bin/alacritty 50

echo "Set up regolith"
cat ./config/regolith > ~/.config/regolith/Xresources
regolith-look refresh

echo "Install lf"
curl -S -s -L https://github.com/gokcehan/lf/releases/download/r17/lf-linux-amd64.tar.gz | sudo tar -xz -C /usr/local/bin

echo "Install vscode"
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt install code