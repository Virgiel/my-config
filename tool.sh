#!/usr/bin/env sh

# Install tools that cannot be found on nix
for type in hx; do
    cargo install hx
done