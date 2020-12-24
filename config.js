/**
 * Config installation tools
 * Write config files to appropriate places in a cross-platform way
 */

import { parse } from 'https://deno.land/std@0.82.0/encoding/toml.ts';
import * as path from 'https://deno.land/std@0.82.0/path/mod.ts';
import * as color from 'https://deno.land/std@0.82.0/fmt/colors.ts';
import { ensureFileSync } from 'https://deno.land/std@0.82.0/fs/mod.ts';

const { os } = Deno.build;

if (Deno.args.length == 0) {
  throw 'You must a config file path as argument';
}

const rootConfigFile = Deno.args[0];
const configMetadata = parse(Deno.readTextFileSync(rootConfigFile));
const fromDir = path.dirname(rootConfigFile);

console.log(color.bold(color.blue(`Start installing ${configMetadata.title}`)));

// Get os specific properties

let osPath; // Which path to use
let toDir; // Which dir to write to
if (os === 'windows') {
  osPath = 'winpath';
  toDir = 'C:/Users/antoi/AppData';
} else if (os === 'linux') {
  osPath = 'unixpath';
  toDir = path.join(Deno.env.get('HOME'), '.config');
} else {
  throw `Unsupported os ${os}`;
}

for (const item of configMetadata.config) {
  console.log(color.magenta(`Setup ${item.title}`));
  let configData = '';
  if (item.raw) {
    configData = item.raw;
  } else if (item.path) {
    configData = Deno.readTextFileSync(path.join(fromDir, item.path));
  } else {
    throw `Not config data in ${item.title}`;
  }

  const toPath = item[osPath];
  const complete = path.join(toDir, toPath);
  // Create file an parent firs if necessary
  ensureFileSync(complete);
  // Write config in config file
  Deno.writeTextFileSync(complete, configData);
}
