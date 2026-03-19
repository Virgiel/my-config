function leaves(value: any, f: (obj: string) => void) {
  if (value === null) {
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) {
      leaves(v, f);
    }
  } else if (typeof value === "object") {
    for (const v of Object.values(value)) {
      leaves(v, f);
    }
  } else if (typeof value === "string") {
    f(value);
  }
}

type RGB = { r: number; g: number; b: number };
type RGBA = { r: number; g: number; b: number; a: number };
type OKLAB = { l: number; a: number; b: number };

function rgb(hex: string): RGB {
  const color = rgba(hex);
  return { r: color.r, g: color.g, b: color.b };
}

function rgba(hex: string): RGBA {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : 255;
  return { r, g, b, a };
}

function fmt(color: RGB | RGBA): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");

  const r = toHex(color.r);
  const g = toHex(color.g);
  const b = toHex(color.b);

  // Check if alpha exists
  if ("a" in color && typeof color.a === "number") {
    const a = toHex(color.a);
    return `#${r}${g}${b}${a}`;
  }

  return `#${r}${g}${b}`;
}

function toOKLAB(rgb: RGB): OKLAB {
  let r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;

  // Linearize RGB
  const lin = (c: number) =>
    c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
  r = lin(r);
  g = lin(g);
  b = lin(b);

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188501 * g + 0.6299787030 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720401 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
}

function getDist(c1: OKLAB, c2: OKLAB): number {
  // Weights: De-prioritize Lightness (L), heavily prioritize Color (a, b)
  const weightL = 0.3;
  const weightA = 2.0;
  const weightB = 2.0;

  return Math.sqrt(
    weightL * Math.pow(c1.l - c2.l, 2) +
      weightA * Math.pow(c1.a - c2.a, 2) +
      weightB * Math.pow(c1.b - c2.b, 2),
  );
}

function findNearest(target: OKLAB, palette: OKLAB[]): number {
  let minDistance = Infinity;
  let nearestIndex = -1;

  palette.forEach((color, index) => {
    const dist = getDist(target, color); // Using the perceptual dist function
    if (dist < minDistance) {
      minDistance = dist;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

function toRGB(oklab: OKLAB): RGB {
  // 1. Back to LMS space
  const l_ = oklab.l + 0.3963377774 * oklab.a + 0.2158037573 * oklab.b;
  const m_ = oklab.l - 0.1055613458 * oklab.a - 0.0638541728 * oklab.b;
  const s_ = oklab.l - 0.0894841775 * oklab.a - 1.2914855480 * oklab.b;

  // 2. Cube the LMS values
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // 3. Back to Linear RGB via inverse matrix
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  // 4. Gamma Correction (Un-linearize)
  const delin = (c: number) =>
    c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;

  // 5. Clamp and Scale to 0-255
  const clamp = (val: number) =>
    Math.max(0, Math.min(255, Math.round(val * 255)));

  return {
    r: clamp(delin(r)),
    g: clamp(delin(g)),
    b: clamp(delin(b)),
  };
}

// 3. The Core Logic: Find similar, then apply diff
function shiftColor(
  source: OKLAB,
  from: OKLAB[],
  to: OKLAB[],
): RGB {
  const idx = findNearest(source, from); // Using your existing index finder

  const baseFrom = from[idx];
  const baseTo = to[idx];

  const polar = ({ a, b }: OKLAB) => ({
    c: Math.hypot(a, b),
    h: Math.atan2(b, a),
  });

  const pSrc = polar(source);
  const pFrom = polar(baseFrom);
  const pTo = polar(baseTo);

  const targetC = pTo.c * (pFrom.c ? pSrc.c / pFrom.c : 1);
  const targetH = pTo.h + (pSrc.h - pFrom.h);
  const targetL = Math.max(0, Math.min(1, baseTo.l + (source.l - baseFrom.l)));

  const resultOk: OKLAB = {
    l: targetL,
    a: targetC * Math.cos(targetH),
    b: targetC * Math.sin(targetH),
  };

  return toRGB(resultOk);
}

const raw = Deno.readTextFileSync("./original-theme.json");
const theme = JSON.parse(raw);

const palette: Set<string> = new Set();
leaves(theme, (color) => {
  if (color.startsWith("#")) {
    palette.add(color.slice(0, 7));
  }
});

const gruvboxDark = [
  "#282828",
  "#928374",
  "#ebdbb2",
  "#fbf1c7",
  "#fb4934",
  "#fe8019",
  "#fabd2f",
  "#b8bb26",
  "#8ec07c",
  "#83a598",
  "#d3869b",
];
const gruvboxMaterialDarkHard = [
  "#202020",
  "#a89d8f",
  "#e2cca9",
  "#ede0cd",
  "#ea6962",
  "#e78a4e",
  "#d8a657",
  "#a9b665",
  "#89b482",
  "#7daea3",
  "#d3869b",
];

const from = gruvboxDark.map(rgb).map(toOKLAB);
const to = gruvboxMaterialDarkHard.map(rgb).map(toOKLAB);
let updated = raw;
let out = "";
for (const color of palette.values()) {
  const parsed = rgb(color);
  const oklab = toOKLAB(parsed);
  const res = shiftColor(oklab, from, to);
  const fmtd = fmt(res);
  updated = updated.replaceAll(color, fmtd);
  out += `${fmt(rgb(color))} ${
    gruvboxDark[findNearest(oklab, from)]
  } ${fmtd}\n`;
}
Deno.writeTextFileSync("./zed-theme.json", updated);
Deno.writeTextFileSync(
  "/Users/antoine/.config/zed/themes/zed-theme.json",
  updated,
);
Deno.writeTextFileSync("./palette", out);
