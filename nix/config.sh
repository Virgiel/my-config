#!/usr/bin/env sh

echo "Copy nix configuration"
ln --force ./configuration.nix /etc/nixos/configuration.nix
ln --force ./font.nix /etc/nixos/font.nix
ln --force ./btm.nix /etc/nixos/btm.nix

echo "Rebuild boot config"
nixos-rebuild switch

echo "Reboot to apply changes"