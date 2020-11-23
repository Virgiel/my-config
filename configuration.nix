{ config, pkgs, ... }:

{
  imports =
    [
      ./hardware-configuration.nix
    ];

 
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
    };

    windowManager.i3 = {
    enable = true;
    extraPackages = with pkgs; [
	dmenu i3status i3lock i3blocks i3status-rust alacritty
	vscode spotify firefox
    ];
    };
  };

  # Enable sound.
  sound.enable = true;
  hardware.pulseaudio.enable = true;

  # Enable touchpad support (enabled default in most desktopManager).
  services.xserver.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.virgiel = {
    isNormalUser = true;
#    hashedPassword = "$6$tQEdKQVv$s8Ykdfg1.kc888/de3YLIvI.AZjls.qREHtqi8G5djcvHGWpsZ6PSIT0mgSgkG7e7V2ctd1AbXN1P.67vpHBD/";
    extraGroups = [ "wheel" "networkmanager" "audio" "video" ]; # Enable ‘sudo’ for the user.
  };

  environment.systemPackages = with pkgs; [
    lf neovim fira-code git
  ];

  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;

  system.stateVersion = "20.09";
}

