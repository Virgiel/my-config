echo "Set up FiraCode"
./script/fira_code.sh

echo "Set up Material Icon"
./script/material_icon.sh

echo "Set up wallpaper"
mkdir --parent --verbose ~/.local/share/wallpaper
cat ./wallpaper/RobinBird.jpg > ~/.local/share/wallpaper/RobinBird.jpg

echo "Set up profile"
cat ./config/profile > ~/.profile
. ~/.profile

echo "Set up cargo"
#sudo apt-get --quiet install curl
#curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt-get --quiet install cargo

echo "Set up i3status-rs"
sudo apt-get --quiet install libdbus-1-dev
cargo install --git https://github.com/greshake/i3status-rust i3status-rs
https://gist.github.com/draoncc/3c20d8d4262892ccd2e227eefeafa8ef/raw/3e6e12c213fba1ec28aaa26430c3606874754c30/MaterialIcons-Regular-for-inline.ttf
mkdir -p -v ~/.config/i3
cat ./config/status.toml > ~/.config/i3/status.toml

echo "Set up alacritty"
sudo apt-get -q install cmake pkg-config libfreetype6-dev libfontconfig1-dev libxcb-xfixes0-dev python3
cargo install --git https://github.com/alacritty/alacritty
mkdir -p -v ~/.config/alacritty
cat ./config/alacritty.yml > ~/.config/alacritty.yml

echo "Set up regolith"
cat ./config/regolith > ~/.config/regolith/Xresources
regolith-look refresh

echo "Install go"
sudo ./script/install_go.sh

echo "Install lf"
env CGO_ENABLED=0 GO111MODULE=on go get -u -ldflags="-s -w" github.com/gokcehan/lf