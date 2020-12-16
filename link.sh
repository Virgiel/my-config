#!/usr/bin/env sh

dir() {
    mkdir --parent --verbose $1
}
link() {
    ln --force $1 $2
}
task() {
    echo $1
    dir $2
    link $3 $4
}


echo "Link wallpaper" 
link ./wallpaper/RobinBird.jpg ~/.background-image

task "Link alacritty config" ~/.config ./dotfiles/alacritty.yml ~/.config/alacritty.yml
task "Link lf config" ~/.config/lf ./dotfiles/lf ~/.config/lf/lfrc
task "Link pistol config" ~/.config/pistol ./dotfiles/pistol ~/.config/pistol/pistol.conf
task "Link neovim config" ~/.config/nvim ./dotfiles/nvim.vim ~/.config/nvim/init.vim
task "Link bat config" ~/.config/bat/themes ./dotfiles/bat/config ~/.config/bat/config
bat cache --build

echo "Link i3 config"
link ./dotfiles/i3/status.toml ~/.config/i3/status.toml
link ./dotfiles/i3/config ~/.config/i3/config

echo "Link rofi config"
dir ~/.config/rofi
link ./dotfiles/rofi/config.rasi ~/.config/rofi/config.rasi
link ./dotfiles/rofi/theme.rasi ~/.config/rofi/theme.rasi

echo "Reload i3"
i3-msg reload