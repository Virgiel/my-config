#!/bin/bash
sudo rm -rf /usr/local/go
wget -c https://golang.org/dl/go1.15.5.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local 
export PATH=$PATH:/usr/local/go/bin