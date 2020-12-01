{ config, pkgs, ... }:

{
  fonts = {
    # TODO custom icon font ?
    # TODO are default fonts nescessary to print foreign languages ?
    fonts = with pkgs; [
      # ----- Programming fonts ----- */
      fira-code # Pretty monospace font with ligature
      # ----- Icons fonts ----- */
      font-awesome-ttf # Pretty icons for status bar
      # ----- UI fonts
      source-sans-pro
      source-code-pro
      source-serif-pro
    ];
    fontconfig.defaultFonts = {
      sansSerif = [ "SourceSansPro" ];
      monospace = [ "SourceCodePro" ];
      serif = [ "SourceSerifPro" ];
    };
  };
}
