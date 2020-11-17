#!/usr/bin/env bash

echo "Set up cargo"
./script/rust.sh
echo "Install cargo tools"
cargo install bat procs ripgrep tokei hyperfine ytop nu

echo "Install lf"
curl -S -s -L https://github.com/gokcehan/lf/releases/download/r17/lf-linux-amd64.tar.gz | sudo tar -xz -C /usr/local/bin