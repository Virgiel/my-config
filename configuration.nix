{ config, pkgs, ... }:

{
  imports =
    [
      ./hardware-configuration.nix
    ];

  nix.autoOptimiseStore = true;
  system.autoUpgrade.enable = true;

  boot.loader.grub = {
    enable = true;
    version = 2;
    device = "/dev/sda";
  };

  networking.hostName = "nixos";
  networking.networkmanager.enable = true;

  # Set your time zone.
  time.timeZone = "Europe/Paris";

  # The global useDHCP flag is deprecated, therefore explicitly set to false here.
  # Per-interface useDHCP will be mandatory in the future, so this generated config
  # replicates the default behaviour.
  networking.useDHCP = false;
  networking.interfaces.enp0s3.useDHCP = true;

  fonts.fonts = with pkgs; [
    fira-code # Pretty monospace font with ligature
    material-design-icons # Pretty icons for status bar
    font-awesome-ttf
  ];

  console = {
    font = "FiraCode";
    keyMap = "fr";
  };

  nixpkgs.config.allowUnfree = true;
  services.xserver = {
    enable = true;

    layout = "fr";
    xkbOptions = "eurosign:e";
    displayManager = {
      defaultSession = "none+i3";
      lightdm = {
        greeters.tiny = {
          enable = true;
          extraConfig = ''
                        static const gchar *style =
                        "window {"
                            "background-color: #202020;"
                        "}"
                        "window * {"
                            "font: 16px \"FiraCode\";"
                        "}"
                        "label {"
                            "color: #d4be98;"
                            "font-weight: bold;"
                            "margin: 8px;"
                        "}"
                        "entry {"
                            "background-color: #3d3835;"
                            "border-radius: 10px;"
                            "padding: 4px 8px;"
                            "caret-color: #d4be98;"
                            "box-shadow: 2px 2px #3d3835 inset;"
                            "color: #d4be98;"
                        "}"
                        "#message_label {"
                            "color: #ea6962;"
                        "}";
                        static const gchar *ui =
            "<?xml version='1.0' encoding='UTF-8'?>"
            "<interface>"
              "<requires lib='gtk+' version='3.20'/>"
              "<object class='GtkWindow' id='login_window'>"
                "<property name='name'>login_window</property>"
                "<property name='can_focus'>False</property>"
                "<property name='resizable'>False</property>"
                "<property name='accept_focus'>False</property>"
                "<property name='decorated'>False</property>"
                "<child>"
                  "<object class='GtkBox' id='login_box'>"
                    "<property name='name'>login_box</property>"
                    "<property name='visible'>True</property>"
                    "<property name='can_focus'>False</property>"
                    "<property name='valign'>center</property>"
                    "<property name='halign'>center</property>"
                    "<property name='orientation'>vertical</property>"
                    "<child>"
                      "<object class='GtkLabel' id='prompt_label'>"
                        "<property name='name'>prompt_label</property>"
                        "<property name='visible'>True</property>"
                        "<property name='can_focus'>False</property>"
                      "</object>"
                      "<packing>"
                        "<property name='expand'>False</property>"
                        "<property name='fill'>True</property>"
                        "<property name='position'>0</property>"
                      "</packing>"
                    "</child>"
                    "<child>"
                      "<object class='GtkEntry' id='prompt_entry'>"
                        "<property name='name'>prompt_entry</property>"
                        "<property name='visible'>True</property>"
                        "<property name='can_focus'>True</property>"
                        "<property name='has_frame'>False</property>"
                        "<property name='max_width_chars'>15</property>"
                        "<property name='primary_icon_activatable'>False</property>"
                        "<property name='secondary_icon_activatable'>False</property>"
                        "<signal name='activate' handler='login_cb' swapped='no'/>"
                      "</object>"
                      "<packing>"
                        "<property name='expand'>False</property>"
                        "<property name='fill'>True</property>"
                        "<property name='position'>1</property>"
                      "</packing>"
                    "</child>"
                    "<child>"
                      "<object class='GtkLabel' id='message_label'>"
                        "<property name='name'>message_label</property>"
                        "<property name='visible'>True</property>"
                        "<property name='can_focus'>False</property>"
                        "<property name='halign'>center</property>"
                        "<property name='width_chars'>25</property>"
                        "<property name='max_width_chars'>50</property>"
                      "</object>"
                      "<packing>"
                        "<property name='expand'>False</property>"
                        "<property name='fill'>True</property>"
                        "<property name='position'>2</property>"
                      "</packing>"
                    "</child>"
                  "</object>"
                "</child>"
              "</object>"
            "</interface>";
          '';
        };
      };
    };

    desktopManager.wallpaper.mode = "fill";

    windowManager.i3 = {
      enable = true;
      extraPackages = with pkgs; [
        dmenu
        i3status
        i3lock
        i3blocks
        i3status-rust
        alacritty
      ];
    };
  };


  environment.systemPackages = with pkgs; [
    neovim
    git
    nixpkgs-fmt
    # Rusty tools
    bat
    ytop
    procs
    ripgrep
    tokei
    hyperfine
    bandwhich
    ion
    nitrogen
    # Common apps
    vscode
    spotify
    firefox
    # ----- Terminal fil$e explorer ----- #
    lf # File explorer
    pistol # File previewer
    chafa # Image previewer
  ];


  # Enable sound.
  sound.enable = true;
  hardware.pulseaudio.enable = true;

  # Enable touchpad support (enabled default in most desktopManager).
  services.xserver.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.virgiel = {
    isNormalUser = true;
    extraGroups = [ "wheel" "networkmanager" "audio" "video" ]; # Enable ‘sudo’ for the user.
  };

  system.stateVersion = "20.09";
}
