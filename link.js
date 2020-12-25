/**
 * Config installation tools
 * Write config files to appropriate places in a cross-platform way
 */

import { parse } from 'https://deno.land/std@0.82.0/encoding/toml.ts';
import { join, dirname } from 'https://deno.land/std@0.82.0/path/mod.ts';
import * as color from 'https://deno.land/std@0.82.0/fmt/colors.ts';
import { ensureLinkSync } from 'https://deno.land/std@0.82.0/fs/mod.ts';

// Get os specific properties
const { os } = Deno.build;
let osPath; // Which path to use
let destDir; // Which dir to write to
if (os === 'windows') {
  osPath = 'winpath';
  destDir = 'C:/Users/antoi/AppData';
} else if (os === 'linux') {
  osPath = 'unixpath';
  destDir = join(Deno.env.get('HOME'), '.config');
} else {
  throw `Unsupported os ${os}`;
}

// Parse config files

if (Deno.args.length == 0) {
  throw 'You must a config file path as argument';
}

const rootConfigFile = Deno.args[0];
const configMetadata = parse(Deno.readTextFileSync(rootConfigFile));
const configDir = dirname(rootConfigFile);

console.log(color.bold(color.blue(`Start installing ${configMetadata.title}`)));

if (!configMetadata.import) {
  configMetadata.import = [];
}

if (!configMetadata.config) {
  configMetadata.config = [];
}

if (!configMetadata.script) {
  configMetadata.script = [];
}

for (const path of configMetadata.import) {
  const importMetadata = parse(Deno.readTextFileSync(join(configDir, path)));
  console.log(color.gray(' - ') + color.blue(importMetadata.title));
  configMetadata.config.push(...importMetadata.config);
}

for (const config of configMetadata.config) {
  console.log(color.magenta(`Link ${config.title}`));
  let srcPath = '';
  if (config.file) {
    srcPath = join(configDir, config.file);
  } else {
    throw `Not file for "${config.title}"`;
  }

  const toPath = config[osPath];
  const destPath = join(destDir, toPath);
  ensureLinkSync(srcPath, destPath);
}

for (const script of configMetadata.script) {
  console.log(color.magenta(`Run ${script.title}`));
  await Deno.run(script).status();
}

console.log(color.green('Configuration successfully installed'));
