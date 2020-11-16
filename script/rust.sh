#!/usr/bin/env bash

 if ! [[ -z $(hostnamectl | grep "Chassis: vm") ]]; then
    echo "Virtual machine detected"
    if ! [[ -x "$(command -v cargo)" ]]; then
        sudo apt -qq install cargo
    else 
        echo "Cargo already installed"
    fi
else 
    if ! [[ -x "$(command -v rustup)" ]]; then
        sudo apt -qq install curl
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    else 
        rustup update
    fi
fi

