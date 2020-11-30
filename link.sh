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

task "Link alacritty config" ~/.config ./config/alacritty.yml ~/.config/alacritty.yml
task "Link ion config" ~/.config/ion ./config/ion ~/.config/ion/initrc
task "Link lf config" ~/.config/lf ./config/lf ~/.config/lf/lfrc
task "Link pistol config" ~/.config/pistol ./config/pistol ~/.config/pistol/pistol.conf

task "Link bat config" ~/.config/bat/themes ./config/bat/config ~/.config/bat/config
bat cache --build

echo "Link i3 config"
link ./config/i3/status.toml ~/.config/i3/status.toml
link ./config/i3/config ~/.config/i3/config

echo "Reload i3"
i3-msg reload