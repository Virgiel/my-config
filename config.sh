#!/usr/bin/env sh

echo "Copy nix configuration"
cp ./configuration.nix /etc/nixos

echo "Rebuild boot config"
nixos-rebuild switch

echo "Reboot to apply changes"