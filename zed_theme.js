const p = {
  // Backgrounds
  bg0: "#1d2021",
  bg1: "#282828",
  bg2: "#282828",
  bg3: "#3c3836",
  bg4: "#3c3836",
  bg5: "#504945",

  statusline1: "#282828",

  // Foregrounds
  fg0: "#e2cca9",
  fg1: "#ede0cd",

  // Accent palette
  red: "#ea6962",
  orange: "#e78a4e",
  yellow: "#d8a657",
  green: "#a9b665",
  aqua: "#89b482",
  blue: "#7daea3",
  purple: "#d3869b",

  // Neutrals
  grey0: "#7c6f64",
  grey1: "#928374",
  grey2: "#a89984",

  // Diff backgrounds
  diffAddBg: "#34381b",
  diffDeleteBg: "#402120",
  diffChangeBg: "#0d3138",

  // Highlights
  currentWordBg: "#32302f",
  findHighlightBg: "#5a4728",
};

const a = (hex, pct) =>
  `${hex}${Math.round((pct / 100) * 255)
    .toString(16)
    .padStart(2, "0")}`;

const acc = p.orange;

const style = {
  // ───────────────── UI CHROME ─────────────────
  "background": p.bg0,
  "background.appearance": "opaque",

  "surface.background": p.bg1,
  "elevated_surface.background": p.bg2,
  "panel.background": p.bg1,

  "toolbar.background": p.bg0,

  "title_bar.background": p.bg1,
  "title_bar.inactive_background": p.bg2,
  "title_bar.border_color": p.bg3,

  "status_bar.background": p.statusline1,

  "tab_bar.background": p.bg1,
  "tab.inactive_background": p.bg1,
  "tab.active_background": p.bg0,

  "pane.focused_border": acc,
  "panel.focused_border": acc,

  // ───────────────── Borders ─────────────────
  "border": p.bg3,
  "border.variant": p.bg4,
  "border.focused": acc,
  "border.selected": acc,
  "border.disabled": p.bg4,
  "border.transparent": "#00000000",

  // ───────────────── Text ─────────────────
  "text": p.fg0,
  "text.muted": p.grey2,
  "text.placeholder": p.grey1,
  "text.disabled": p.grey0,
  "text.accent": acc,

  // ───────────────── Icons ─────────────────
  "icon": p.fg0,
  "icon.muted": p.grey2,
  "icon.disabled": p.grey0,
  "icon.placeholder": p.grey1,
  "icon.accent": acc,

  // ───────────────── Editor ─────────────────
  "editor.background": p.bg0,
  "editor.foreground": p.fg0,
  "editor.gutter.background": p.bg0,
  "editor.subheader.background": p.bg1,

  "editor.active_line.background": a(p.bg2, 72),
  "editor.highlighted_line.background": a(p.bg2, 52),

  "editor.line_number": p.grey0,
  "editor.active_line_number": p.yellow,

  "editor.invisible": p.bg4,

  "editor.wrap_guide": p.bg3,
  "editor.active_wrap_guide": p.bg4,

  "editor.indent_guide": a(p.bg3, 65),
  "editor.indent_guide_active": p.bg4,

  // ───────────────── Cursor / Selection ─────────────────
  "editor.caret": acc,

  "editor.selection.background": a(p.bg4, 82),
  "editor.active_selection.background": a(p.bg4, 96),
  "editor.selection.border": "#00000000",

  // ───────────────── Word Highlight ─────────────────
  "editor.document_highlight.read_background": a(p.currentWordBg, 85),
  "editor.document_highlight.write_background": a(p.currentWordBg, 100),

  // ───────────────── Search ─────────────────
  "editor.find_all_background": a(p.findHighlightBg, 72),

  "editor.find_match_background": a(acc, 32),
  "editor.find_match_border": acc,

  "editor.active_find_match.background": a(acc, 54),
  "editor.active_find_match.border": p.yellow,

  // ───────────────── VCS ─────────────────
  "created": p.green,
  "modified": p.blue,
  "deleted": p.red,
  "renamed": p.purple,
  "conflict": p.orange,
  "hidden": p.grey0,

  "version_control.added.background": a(p.diffAddBg, 88),
  "version_control.modified.background": a(p.diffChangeBg, 88),
  "version_control.deleted.background": a(p.diffDeleteBg, 88),
  "version_control.conflict.background": a(p.findHighlightBg, 80),

  // ───────────────── Diagnostics ─────────────────
  "error": p.red,
  "warning": p.yellow,
  "info": p.blue,
  "hint": p.aqua,
  "predictive": p.grey1,

  "error.background": a(p.red, 14),
  "warning.background": a(p.yellow, 14),
  "info.background": a(p.blue, 14),
  "hint.background": a(p.aqua, 14),

  // ───────────────── Scrollbar ─────────────────
  "scrollbar.thumb.background": a(p.bg5, 78),
  "scrollbar.thumb.hover_background": p.bg5,
  "scrollbar.thumb.border": a(p.bg5, 55),
  "scrollbar.track.background": "#00000000",
  "scrollbar.track.border": "#00000000",

  // ───────────────── Autocomplete ─────────────────
  "editor.autocomplete.background": p.bg1,
  "editor.autocomplete.border": p.bg3,
  "editor.autocomplete.selected_text": p.fg0,
  "editor.autocomplete.match_text": acc,
  "editor.autocomplete.completion_documentation_primary_text": p.fg0,
  "editor.autocomplete.completion_documentation_secondary_text": p.grey2,

  // ───────────────── Terminal ─────────────────
  "terminal.background": p.bg0,
  "terminal.foreground": p.fg0,
  "terminal.bright_foreground": p.fg1,
  "terminal.dim_foreground": p.grey2,

  "terminal.ansi.black": p.bg3,
  "terminal.ansi.bright_black": p.bg4,

  "terminal.ansi.red": p.red,
  "terminal.ansi.bright_red": p.red,

  "terminal.ansi.green": p.green,
  "terminal.ansi.bright_green": p.green,

  "terminal.ansi.yellow": p.yellow,
  "terminal.ansi.bright_yellow": p.yellow,

  "terminal.ansi.blue": p.blue,
  "terminal.ansi.bright_blue": p.blue,

  "terminal.ansi.magenta": p.purple,
  "terminal.ansi.bright_magenta": p.purple,

  "terminal.ansi.cyan": p.aqua,
  "terminal.ansi.bright_cyan": p.aqua,

  "terminal.ansi.white": p.fg0,
  "terminal.ansi.bright_white": p.fg1,

  // ───────────────── Misc ─────────────────
  "link_text.hover": p.blue,

  // ───────────────── Syntax ─────────────────
  syntax: {
    // punctuation
    "punctuation": { color: p.grey2 },
    "punctuation.bracket": { color: p.grey2 },
    "punctuation.special": { color: p.orange },

    // comments
    "comment": { color: p.grey1, font_style: "italic" },
    "comment.doc": { color: p.grey1, font_style: "italic" },

    // constants
    "constant": { color: p.aqua },
    "constant.builtin": { color: p.aqua, font_weight: 700 },
    "constant.numeric": { color: p.purple },
    "constant.character.escape": { color: p.orange },

    // strings
    "string": { color: p.green },
    "string.doc": { color: p.green, font_style: "italic" },
    "string.escape": { color: p.orange },
    "string.regex": { color: p.orange },
    "string.special.url": { color: p.blue, font_style: "underline" },

    // variables
    "variable": { color: p.fg0 },
    "variable.builtin": { color: p.orange },
    "variable.member": { color: p.fg0 },
    "variable.parameter": { color: p.fg0, font_style: "italic" },
    "variable.parameter.builtin": { color: p.orange, font_style: "italic" },

    // functions
    "function": { color: p.green },
    "function.call": { color: p.green },
    "function.definition": { color: p.green, font_weight: 700 },
    "function.method": { color: p.green },
    "function.method.call": { color: p.green },
    "function.builtin": { color: p.aqua, font_weight: 700 },
    "function.decorator": { color: p.yellow, font_style: "italic" },

    // properties
    "property": { color: p.aqua },
    "property.definition": { color: p.aqua },

    // keywords
    "keyword": { color: p.red },
    "keyword.control": { color: p.red },
    "keyword.debug": { color: p.orange },
    "keyword.directive": { color: p.orange },
    "keyword.return": { color: p.red },
    "keyword.repeat": { color: p.red },
    "keyword.import": { color: p.red },
    "keyword.exception": { color: p.red },

    "keyword.operator": { color: p.orange },
    "keyword.modifier": { color: p.orange },
    "keyword.storage": { color: p.orange },
    "keyword.function": { color: p.orange, font_weight: 700 },

    "keyword.type": { color: p.yellow },

    // operators
    "operator": { color: p.orange },

    // types
    "type": { color: p.yellow },
    "type.builtin": { color: p.yellow, font_weight: 700 },
    "type.class": { color: p.yellow, font_weight: 700 },
    "type.interface": { color: p.yellow, font_style: "italic" },
    "type.parameter": { color: p.yellow, font_style: "italic" },
    "type.enum.variant": { color: p.aqua },

    // attributes
    "attribute": { color: p.yellow, font_style: "italic" },

    // modules
    "namespace": { color: p.blue },
    "module": { color: p.blue },

    // tags
    "tag": { color: p.yellow },
    "tag.builtin": { color: p.yellow, font_weight: 700 },
    "tag.attribute": { color: p.aqua },
    "tag.delimiter": { color: p.grey2 },

    // markdown
    "markup.heading": { color: p.yellow, font_weight: 700 },
    "markup.heading.marker": { color: p.orange },
    "markup.bold": { color: p.fg0, font_weight: 700 },
    "markup.italic": { color: p.fg0, font_style: "italic" },
    "markup.link": { color: p.blue, font_style: "underline" },
    "markup.quote": { color: p.green, font_style: "italic" },
    "markup.raw.inline": { color: p.orange },
    "markup.raw.block": { color: p.orange },

    // diff
    "diff.plus": { color: p.green },
    "diff.minus": { color: p.red },
    "diff.delta": { color: p.blue },
    "diff.header": { color: p.aqua, font_weight: 700 },
    "diff.range": { color: p.purple, font_style: "italic" },
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
      style
    }
  ]
};

const json = JSON.stringify(theme, null, 2);

Deno.writeTextFileSync("./zed-theme.json", json);
Deno.writeTextFileSync(
  "/Users/antoine/.config/zed/themes/zed-theme.json",
  json,
);