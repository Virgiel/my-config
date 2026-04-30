import { dirname, fromFileUrl } from "jsr:@std/path";
import * as ini from "jsr:@std/ini";
import * as toml from "jsr:@std/toml";

const SCRIPT_DIR = dirname(fromFileUrl(import.meta.url));
const HOME = Deno.env.get("HOME");

// Backgrounds
const bg0 = "#121212";
const bg1 = "#161616";
const bg3 = "#202020";

// Foregrounds
const fg0 = "#e2cca9";
const fg1 = "#ede0cd";

// Accent palette
const red = "#ea6962";
const orange = "#e78a4e";
const yellow = "#d8a657";
const green = "#a9b665";
const aqua = "#89b482";
const blue = "#7daea3";
const purple = "#d3869b";

const brightRed = "#ef7e77";
const brightYellow = "#e1b26a";
const brightGreen = "#b8c573";
const brightAqua = "#96c28e";
const brightBlue = "#8ebaa4";
const brightPurple = "#df97ac";

const darkRed = "#b85651";
const darkOrange = "#bd6f3e";
const darkYellow = "#c18f41";
const darkGreen = "#8f9a52";
const darkAqua = "#4e664a";
const darkBlue = "#68948a";
const darkPurple = "#ab6c7d";

// Neutrals
const grey0 = "#7c6f64";
const grey1 = "#928374";
const grey2 = "#a89984";

// Highlights
const currentWordBg = "#32302f";
const findHighlightBg = "#5a4728";

const accent = orange;
const debug = "#F00FFF";
const transparent = "#00000000";

const a = (hex, pct) =>
  `${hex}${
    Math.round((pct / 100) * 255)
      .toString(16)
      .padStart(2, "0")
  }`;

const accents = [
  orange,
  red,
  green,
  yellow,
  blue,
  purple,
  aqua,
];

function zed_theme() {
  const style = {
    "accents": accents,
    // ───────────────── Surface ─────────────────
    "background": bg1,
    "background.appearance": "opaque",
    "surface.background": bg1,
    "panel.background": bg0,
    "elevated_surface.background": bg0,
    "title_bar.background": bg0,
    "status_bar.background": bg0,
    "toolbar.background": bg0,
    "tab_bar.background": bg0,
    "tab.inactive_background": bg0,
    "tab.active_background": bg1,

    "element.background": bg0,
    "element.hover": bg1,
    "element.active": bg3,
    "element.selected": bg3,
    "element.disabled": bg1,

    "ghost_element.background": transparent,
    "ghost_element.hover": bg1,
    "ghost_element.active": bg3,
    "ghost_element.selected": bg3,
    "ghost_element.disabled": bg1,

    "border": bg3,
    "border.variant": bg1,
    "border.selected": a(accent, 80),
    "border.transparent": transparent,
    "border.disabled": bg1,
    "panel.focused_border": accent,
    "pane.focused_border": accent,

    // ───────────────── Text ─────────────────
    "text": fg0,
    "text.muted": grey2,
    "text.placeholder": grey1,
    "text.disabled": grey0,
    "text.accent": accent,

    "icon": fg0,
    "icon.muted": grey2,
    "icon.placeholder": grey1,
    "icon.disabled": grey0,
    "icon.accent": a(accent, 80),

    // ───────────────── Editor ─────────────────
    "editor.background": bg1,
    "editor.foreground": fg0,
    "editor.gutter.background": bg1,
    "editor.subheader.background": bg0,

    "editor.active_line.background": a(currentWordBg, 55),
    "editor.highlighted_line.background": a(bg1, 52),

    "editor.line_number": grey0,
    "editor.active_line_number": fg0,

    "editor.wrap_guide": bg3,
    "editor.active_wrap_guide": bg3,

    "editor.indent_guide": a(bg3, 65),
    "editor.indent_guide_active": bg3,

    // ───────────────── Cursor / Selection ─────────────────
    "editor.caret": red,

    "editor.selection.background": a(bg3, 82),
    "editor.active_selection.background": a(bg3, 96),
    "editor.selection.border": transparent,

    // ───────────────── Word Highlight ─────────────────
    "editor.document_highlight.read_background": a(currentWordBg, 85),
    "editor.document_highlight.write_background": a(currentWordBg, 100),

    // ───────────────── Search ─────────────────
    "editor.find_all_background": a(findHighlightBg, 72),

    "editor.find_match_background": a(accent, 32),
    "editor.find_match_border": accent,

    "editor.active_find_match.background": a(accent, 54),
    "editor.active_find_match.border": yellow,

    "version_control.added": green,
    "version_control.modified": yellow,
    "version_control.word_added": darkGreen,
    "version_control.word_deleted": darkRed,
    "version_control.deleted": red,
    "version_control.conflict_marker.ours": a(green, 14),
    "version_control.conflict_marker.theirs": a(blue, 14),

    // ───────────────── Status ─────────────────
    "conflict": purple,
    "conflict.background": a(purple, 14),
    "conflict.border": transparent,
    "created": green,
    "created.background": a(green, 14),
    "created.border": transparent,
    "deleted": red,
    "deleted.background": a(red, 14),
    "deleted.border": transparent,
    "error": red,
    "error.background": a(red, 14),
    "error.border": transparent,
    "hidden": grey0,
    "hidden.background": a(grey0, 25),
    "hidden.border": transparent,
    "hint": blue,
    "hint.background": a(blue, 25),
    "hint.border": transparent,
    "ignored": grey0,
    "ignored.background": a(grey0, 14),
    "ignored.border": transparent,
    "info": aqua,
    "info.background": a(aqua, 14),
    "info.border": transparent,
    "modified": yellow,
    "modified.background": a(yellow, 14),
    "modified.border": transparent,
    "predictive": grey1,
    "predictive.background": a(grey1, 14),
    "predictive.border": transparent,
    "renamed": blue,
    "renamed.background": a(blue, 14),
    "renamed.border": transparent,
    "success": green,
    "success.background": a(green, 14),
    "success.border": transparent,
    "unreachable": grey1,
    "unreachable.background": a(grey1, 14),
    "unreachable.border": transparent,
    "warning": yellow,
    "warning.background": a(yellow, 14),
    "warning.border": transparent,

    // ───────────────── Scrollbar ─────────────────
    "scrollbar.thumb.background": a(bg3, 50),
    "scrollbar.thumb.hover_background": bg3,
    "scrollbar.thumb.border": a(bg3, 55),
    "scrollbar.track.background": transparent,
    "scrollbar.track.border": transparent,

    // ───────────────── Autocomplete ─────────────────
    "editor.autocomplete.background": bg1,
    "editor.autocomplete.border": bg3,
    "editor.autocomplete.selected_text": fg0,
    "editor.autocomplete.match_text": accent,
    "editor.autocomplete.completion_documentation_primary_text": fg0,
    "editor.autocomplete.completion_documentation_secondary_text": grey2,

    // ───────────────── Terminal ─────────────────
    "terminal.background": bg1,
    "terminal.foreground": fg0,
    "terminal.bright_foreground": fg1,
    "terminal.dim_foreground": grey2,
    "terminal.ansi.black": bg1,
    "terminal.ansi.bright_black": bg1,
    "terminal.ansi.dim_black": a(bg1, 90),
    "terminal.ansi.white": fg0,
    "terminal.ansi.bright_white": fg1,
    "terminal.ansi.dim_white": fg1,
    "terminal.ansi.red": red,
    "terminal.ansi.bright_red": brightRed,
    "terminal.ansi.dim_red": darkRed,
    "terminal.ansi.green": green,
    "terminal.ansi.bright_green": brightGreen,
    "terminal.ansi.dim_green": darkGreen,
    "terminal.ansi.yellow": yellow,
    "terminal.ansi.bright_yellow": brightYellow,
    "terminal.ansi.dim_yellow": darkYellow,
    "terminal.ansi.blue": blue,
    "terminal.ansi.bright_blue": brightBlue,
    "terminal.ansi.dim_blue": darkBlue,
    "terminal.ansi.magenta": purple,
    "terminal.ansi.bright_magenta": brightPurple,
    "terminal.ansi.dim_magenta": darkPurple,
    "terminal.ansi.cyan": aqua,
    "terminal.ansi.bright_cyan": brightAqua,
    "terminal.ansi.dim_cyan": darkAqua,

    // ───────────────── Misc ─────────────────
    "link_text.hover": blue,

    // ----------------- Players --------------
    "players": accents.map((c) => {
      return {
        "cursor": c,
        "background": c,
        "selection": a(c, 10),
      };
    }),

    // ───────────────── Syntax ─────────────────
    syntax: {
      // Core structure
      "comment": { color: grey1, font_style: "italic" },
      "comment.doc": { color: grey2, font_style: "italic" },
      "tag.doctype": { color: grey2 },
      "punctuation": { color: grey2 },
      "punctuation.bracket": { color: grey1 },
      "punctuation.delimiter": { color: grey2 },
      "punctuation.list_marker": { color: grey2 },
      "punctuation.special": { color: grey2 },
      "punctuation.unsafe": { color: red },

      // Language keywords
      "keyword": { color: orange, font_style: "italic" },
      "keyword.unsafe": { color: red },
      "operator": { color: orange },
      "lifetime": { color: orange },

      // Identifiers
      "property": { color: fg0 },
      "variable": { color: fg0 },
      "constant": { color: fg0 },
      "constant.builtin": { color: fg0 },
      "variant": { color: fg0 },

      // Functions
      "function": { color: aqua },

      // Types
      "type": { color: yellow },
      "enum": { color: yellow },
      "tag": { color: yellow },
      "label": { color: yellow, font_style: "italic" },

      // Literals
      "string": { color: green },
      "string.escape": { color: yellow },
      "string.special": { color: green, font_style: "italic" },

      // Metadata / secondary constructs
      "attribute": { color: purple },
      "boolean": { color: purple },
      "variable.special": { color: purple },

      // Reduced importance
      "hint": { color: a(grey1, 50) },
      "predictive": { color: grey1 },

      "diff.plus": { color: green },
      "diff.minus": { color: red },

      // WIP
      "embedded": { color: debug },
      "emphasis": { color: debug },
      "emphasis.strong": { color: debug },

      "link_text": { color: debug },
      "link_uri": { color: debug },
      "number": { color: purple },
      "preproc": { color: debug },
      "primary": { color: debug },
      "text.literal": { color: debug },
      "title": { color: debug },
    },
  };

  return {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Virgiel Theme",
    author: "Virgiel",
    themes: [
      {
        name: "Virgiel Material",
        appearance: "dark",
        style,
      },
    ],
  };
}

function vs_theme() {
  return {
    "$schema": "vscode://schemas/color-theme",
    name: "Virgiel Material",
    type: "dark",
    colors: {
      // Base UI
      "foreground": fg0,
      "background": bg0,
      "editor.foreground": fg0,
      "editor.background": bg1,
      "activityBar.background": bg0,
      "panel.background": bg0,
      "sideBar.background": bg0,
      "statusBar.background": bg0,

      /*"editor.background": bg1,
      "editor.foreground": fg0,*/

      /*"sideBar.background": bg0,
      "activityBar.background": bg0,
      "titleBar.activeBackground": bg0,
      "statusBar.background": bg0,
      "tab.activeBackground": bg1,
      "tab.inactiveBackground": bg0,
      "panel.background": bg0,*/

      // Text
      "descriptionForeground": grey2,
      "disabledForeground": grey0,

      // Cursor / Selection
      "editorCursor.foreground": red,
      "editor.selectionBackground": a(bg3, 82),
      "editor.inactiveSelectionBackground": a(bg3, 60),
      "editor.selectionHighlightBackground": a(bg3, 45),

      // Line highlight
      "editor.lineHighlightBackground": a(currentWordBg, 55),

      // Search
      "editor.findMatchBackground": a(accent, 54),
      "editor.findMatchBorder": yellow,
      "editor.findMatchHighlightBackground": a(accent, 32),
      "editor.findRangeHighlightBackground": a(findHighlightBg, 72),

      // Word highlight
      "editor.wordHighlightBackground": a(currentWordBg, 85),
      "editor.wordHighlightStrongBackground": a(currentWordBg, 100),

      // Gutter
      "editorLineNumber.foreground": grey0,
      "editorLineNumber.activeForeground": fg0,

      // Indent guides
      "editorIndentGuide.background1": a(bg3, 65),
      "editorIndentGuide.activeBackground1": bg3,

      // Scrollbar
      "scrollbarSlider.background": a(bg3, 50),
      "scrollbarSlider.hoverBackground": bg3,
      "scrollbarSlider.activeBackground": bg3,

      // Suggest widget
      "editorSuggestWidget.background": bg1,
      "editorSuggestWidget.border": bg3,
      "editorSuggestWidget.foreground": fg0,
      "editorSuggestWidget.selectedForeground": fg0,
      "editorSuggestWidget.highlightForeground": accent,

      // Terminal
      "terminal.background": bg1,
      "terminal.foreground": fg0,
      "terminalCursor.foreground": red,

      "terminal.ansiBlack": bg1,
      "terminal.ansiRed": red,
      "terminal.ansiGreen": green,
      "terminal.ansiYellow": yellow,
      "terminal.ansiBlue": blue,
      "terminal.ansiMagenta": purple,
      "terminal.ansiCyan": aqua,
      "terminal.ansiWhite": fg0,

      "terminal.ansiBrightBlack": bg1,
      "terminal.ansiBrightRed": red,
      "terminal.ansiBrightGreen": green,
      "terminal.ansiBrightYellow": yellow,
      "terminal.ansiBrightBlue": blue,
      "terminal.ansiBrightMagenta": purple,
      "terminal.ansiBrightCyan": aqua,
      "terminal.ansiBrightWhite": fg1,
    },

    tokenColors: [
      // Comments
      {
        scope: ["comment"],
        settings: {
          foreground: grey1,
          fontStyle: "italic",
        },
      },

      // Keywords
      {
        scope: ["keyword", "storage"],
        settings: {
          foreground: orange,
          fontStyle: "italic",
        },
      },

      // Operators / punctuation
      {
        scope: ["keyword.operator", "punctuation"],
        settings: {
          foreground: grey2,
        },
      },

      // Strings
      {
        scope: ["string"],
        settings: {
          foreground: green,
        },
      },

      {
        scope: ["constant.character.escape"],
        settings: {
          foreground: yellow,
        },
      },

      // Numbers / booleans
      {
        scope: ["constant.numeric", "constant.language.boolean"],
        settings: {
          foreground: purple,
        },
      },

      // Functions
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call",
        ],
        settings: {
          foreground: aqua,
        },
      },

      // Variables / properties
      {
        scope: [
          "variable",
          "meta.object-literal.key",
          "support.variable",
        ],
        settings: {
          foreground: fg0,
        },
      },

      // Types / classes
      {
        scope: [
          "storage.type",
          "entity.name.type",
          "entity.name.class",
          "support.type",
        ],
        settings: {
          foreground: yellow,
        },
      },

      // Constants
      {
        scope: ["constant", "support.constant"],
        settings: {
          foreground: fg0,
        },
      },

      // Attributes / decorators
      {
        scope: [
          "entity.other.attribute-name",
          "meta.annotation",
        ],
        settings: {
          foreground: purple,
        },
      },

      // Tags
      {
        scope: [
          "entity.name.tag",
          "meta.tag",
        ],
        settings: {
          foreground: yellow,
        },
      },
    ],
  };
}

function ghostly_theme() {
  return `
palette = 0=${bg1}
palette = 1=${red}
palette = 2=${green}
palette = 3=${yellow}
palette = 4=${blue}
palette = 5=${purple}
palette = 6=${aqua}
palette = 7=${fg0}
palette = 8=${grey1}
palette = 9=${brightRed}
palette = 10=${brightGreen}
palette = 11=${brightYellow}
palette = 12=${brightBlue}
palette = 13=${brightPurple}
palette = 14=${brightAqua}
palette = 15=${fg1}

background = ${bg0}
foreground = ${fg0}
cursor-color = ${orange}
cursor-text = ${fg0}
selection-background = ${currentWordBg}
selection-foreground = ${fg0}
  `;
}

function rio_theme() {
  return {
    colors: {
      background: bg1,
      foreground: fg0,

      cursor: accent,

      black: fg0,
      blue: blue,
      cyan: aqua,
      green: green,
      magenta: purple,
      red: red,
      white: fg0,
      yellow: yellow,

      "dim-black": fg0,
      "dim-blue": darkBlue,
      "dim-cyan": darkAqua,
      "dim-green": darkGreen,
      "dim-magenta": darkPurple,
      "dim-red": darkRed,
      "dim-white": fg0,
      "dim-yellow": darkYellow,

      "light-black": fg0,
      "light-blue": brightBlue,
      "light-cyan": brightAqua,
      "light-green": brightGreen,
      "light-magenta": brightPurple,
      "light-red": brightRed,
      "light-white": fg0,
      "light-yellow": brightYellow,
    },
  };
}

function symlink(target, link) {
  const realTarget = Deno.realPathSync(target);

  let existingTarget = null;

  try {
    const stat = Deno.lstatSync(link);

    if (stat.isSymlink) {
      existingTarget = Deno.realPathSync(link);
    } else {
      // It's a real folder/file → must replace
      Deno.removeSync(link, { recursive: true });
    }
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) throw err;
  }

  // If symlink already correct → do nothing
  if (existingTarget === realTarget) {
    return false; // no change
  }

  // Otherwise recreate symlink
  try {
    Deno.removeSync(link, { recursive: true });
  } catch {
    // ignore missing
  }

  Deno.symlinkSync(target, link, { type: "dir" });

  return true; // updated
}

// Install zed theme
const zed = zed_theme();
const zed_json = JSON.stringify(zed, null, 2);
Deno.writeTextFileSync(`${SCRIPT_DIR}/zed.json`, zed_json);
symlink(`${SCRIPT_DIR}/zed.json`, `${HOME}/.config/zed/themes/zed-theme.json`);

// Install vscode theme WIP
const vs = vs_theme();
const vs_json = JSON.stringify(vs, null, 2);
Deno.writeTextFileSync(`${SCRIPT_DIR}/vscode/theme.json`, vs_json);
symlink(
  `${SCRIPT_DIR}/vscode`,
  `${HOME}/.vscode/extensions/virgiel.material-theme-1.0.0`,
);

// Install ghostly theme
const ghostly = ghostly_theme();
Deno.writeTextFileSync(`${SCRIPT_DIR}/ghostly.conf`, ghostly);
symlink(
  `${SCRIPT_DIR}/ghostly.conf`,
  `${HOME}/.config/ghostty/themes/virgiel-theme.conf`,
);

// Install rio theme
const rio = rio_theme();
Deno.writeTextFileSync(`${SCRIPT_DIR}/rio.toml`, toml.stringify(rio));
symlink(
  `${SCRIPT_DIR}/rio.toml`,
  `${HOME}/.config/rio/themes/virgiel.toml`,
);
