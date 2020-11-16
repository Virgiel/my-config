#!/usr/bin/env bash

echo "Set up regolith and code"
sudo add-apt-repository -y -n ppa:regolith-linux/release
curl -S -s https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add
sudo add-apt-repository -y "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt install code
sudo apt install regolith-desktop-standard
sudo apt -q dist-upgrade

echo "Set up cargo"
./script/rust.sh

echo "Set up i3status-rs"
sudo apt -qq install libdbus-1-dev
cargo install --git https://github.com/greshake/i3status-rust --tag v0.14.2 i3status-rs
https://gist.github.com/draoncc/3c20d8d4262892ccd2e227eefeafa8ef/raw/3e6e12c213fba1ec28aaa26430c3606874754c30/MaterialIcons-Regular-for-inline.ttf

echo "Set up alacritty"
sudo apt -qq install cmake pkg-config libfreetype6-dev libfontconfig1-dev libxcb-xfixes0-dev python3
cargo install --git https://github.com/alacritty/alacritty --tag v0.6.0-rc2 
sudo update-alternatives --install /usr/bin/x-terminal-emulator x-terminal-emulator ~/.cargo/bin/alacritty 50

echo "Install lf"
curl -S -s -L https://github.com/gokcehan/lf/releases/download/r17/lf-linux-amd64.tar.gz | sudo tar -xz -C /usr/local/bin

echo "Setup config"
./config.sh