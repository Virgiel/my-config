#!/usr/bin/env bash

echo "Set repository and update dependencies"

curl -Ss https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
curl -sS https://download.spotify.com/debian/pubkey_0D811D58.gpg | sudo apt-key add - 
sudo add-apt-repository -y ppa:regolith-linux/release "deb http://repository.spotify.com stable non-free" "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt -qq -y install code spotify-client regolith-desktop-standard
sudo apt -q -y dist-upgrade
sudo apt -qq -y autoremove
echo "Open a new session to access regolith"