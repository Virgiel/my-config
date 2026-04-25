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

// Neutrals
const grey0 = "#7c6f64";
const grey1 = "#928374";
const grey2 = "#a89984";

// Highlights
const currentWordBg = "#32302f";
const findHighlightBg = "#5a4728";

const accent = orange;
const debug = "#F00FFF";
const none = "#00000000";

const a = (hex, pct) =>
  `${hex}${Math.round((pct / 100) * 255)
    .toString(16)
    .padStart(2, "0")
  }`;

const style = {
  // ───────────────── Surface ─────────────────
  "background": bg1,
  "background.appearance": "opaque",
  "surface.background": bg1,
  "panel.background": bg0,

  "title_bar.background": bg0,
  "status_bar.background": bg0,
  "tab_bar.background": bg0,

  "border": bg3,
  
  // ───────────────── Text ─────────────────
  "text": fg0,
  "text.muted": grey2,
  "text.placeholder": grey1,
  "text.disabled": grey0,
  "text.accent": a(accent, 80),

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
  "editor.selection.border": none,

  // ───────────────── Word Highlight ─────────────────
  "editor.document_highlight.read_background": a(currentWordBg, 85),
  "editor.document_highlight.write_background": a(currentWordBg, 100),

  // ───────────────── Search ─────────────────
  "editor.find_all_background": a(findHighlightBg, 72),

  "editor.find_match_background": a(accent, 32),
  "editor.find_match_border": accent,

  "editor.active_find_match.background": a(accent, 54),
  "editor.active_find_match.border": yellow,

  // ───────────────── Status ─────────────────
  "hint": grey1,
  "hint.background": a(grey1, 14),
  "hint.border": none,
  "info": aqua,
  "info.background": a(aqua, 14),
  "info.border": none,
  "warning": yellow,
  "warning.background": a(yellow, 14),
  "warning.border": none,
  "error": red,
  "error.background": a(red, 14),
  "error.border": none,
  "created": green,
  "modified": blue,
  "deleted": red,
  "renamed": purple,
  "conflict": orange,
  "ignored": grey0,
  "predictive": grey1,

  // ───────────────── Scrollbar ─────────────────
  "scrollbar.thumb.background": a(bg3, 50),
  "scrollbar.thumb.hover_background": bg3,
  "scrollbar.thumb.border": a(bg3, 55),
  "scrollbar.track.background": none,
  "scrollbar.track.border": none,

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
  "terminal.ansi.bright_red": red,
  "terminal.ansi.dim_red": a(red, 90),
  "terminal.ansi.green": green,
  "terminal.ansi.bright_green": green,
  "terminal.ansi.dim_green": a(green, 90),
  "terminal.ansi.yellow": yellow,
  "terminal.ansi.bright_yellow": yellow,
  "terminal.ansi.dim_yellow": a(yellow, 90),
  "terminal.ansi.blue": blue,
  "terminal.ansi.bright_blue": blue,
  "terminal.ansi.dim_blue": a(blue, 90),
  "terminal.ansi.magenta": purple,
  "terminal.ansi.bright_magenta": purple,
  "terminal.ansi.dim_magenta": a(purple, 90),
  "terminal.ansi.cyan": aqua,
  "terminal.ansi.bright_cyan": aqua,
  "terminal.ansi.dim_cyan": a(aqua, 90),

  // ───────────────── Misc ─────────────────
  "link_text.hover": blue,

  // ----------------- Players --------------
  "players": [
    {
      "cursor": accent,
      "background": accent,
      "selection": a(accent, 10),
    },
  ],

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

    // Language keywords
    "keyword": { color: orange, font_style: "italic" },
    "operator": { color: orange },

    // Identifiers
    "property": { color: fg0 },
    "variable": { color: fg0 },
    "constant": { color: fg0 },
    "constant.builtin": { color: fg0 },

    // Functions
    "function": { color: aqua },

    // Types
    "type": { color: yellow },
    "enum": { color: yellow },
    "tag": { color: yellow },

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

    // WIP
    "embedded": { color: debug },
    "emphasis": { color: debug },
    "emphasis.strong": { color: debug },
    "label": { color: debug },
    "link_text": { color: debug },
    "link_uri": { color: debug },
    "number": { color: purple },
    "preproc": { color: debug },
    "primary": { color: debug },
    "text.literal": { color: debug },
    "title": { color: debug },
    "variant": { color: debug },
  },
};

const theme = {
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

const json = JSON.stringify(theme, null, 2);

Deno.writeTextFileSync("./zed-theme.json", json);
Deno.writeTextFileSync(
  "/Users/antoine/.config/zed/themes/zed-theme.json",
  json,
);
