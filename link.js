/**
 * Config installation tools
 * Write config files to appropriate places in a cross-platform way
 */

import { parse } from "https://deno.land/std@0.133.0/encoding/toml.ts";
import { dirname, join } from "https://deno.land/std@0.133.0/path/mod.ts";
import * as color from "https://deno.land/std@0.133.0/fmt/colors.ts";
import { ensureLinkSync } from "https://deno.land/std@0.133.0/fs/mod.ts";

// Get os specific properties
const { os } = Deno.build;
let osPath; // Which path to use
let destDir; // Which dir to write to
if (os === "windows") {
  osPath = "winpath";
  destDir = "C:/Users/antoi/AppData";
} else if (os === "linux") {
  osPath = "unixpath";
  destDir = join(Deno.env.get("HOME"), ".config");
}  else if (os === "darwin") {
  osPath = "darwinpath";
  destDir = join(Deno.env.get("HOME"), "Library/Application Support");
} else {
  throw `Unsupported os ${os}`;
}

// Parse config files

if (Deno.args.length == 0) {
  throw "You must a config file path as argument";
}

const configFile = Deno.args[0];
const config = parse(Deno.readTextFileSync(configFile));
const configDir = dirname(configFile);

config.config ??= [];

console.log(color.bold(color.blue(`Start installing ${config.title}`)));

for (const path of config.import ?? []) {
  const imported = parse(Deno.readTextFileSync(join(configDir, path)));
  console.log(color.gray(" - ") + color.blue(imported.title));
  config.config.push(...imported.config);
}

for (const item of config.config ?? []) {
  let srcPath = "";
  if (item.file) {
    srcPath = join(configDir, item.file);
  } else {
    throw `Not file for "${item.title}"`;
  }

  const toPath = item[osPath]; 
  if (toPath) {
    const destPath = join(destDir, toPath);
    ensureLinkSync(srcPath, destPath);
    console.log(color.magenta(`Link ${item.title}`));
  } else {
    console.log(color.yellow(`Skip ${item.title}`));
  }
}

for (const script of config.script ?? []) {
  console.log(color.magenta(`Run ${script.title}`));
  await Deno.run(script).status();
}

console.log(color.green("Configuration successfully installed"));
