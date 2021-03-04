/**
 * Executable installation tools
 * Download, decompress and install files to appropriate places in a cross-platform way
 */

import { ensureDir } from 'https://deno.land/std@0.89.0/fs/ensure_dir.ts';
import { basename, join } from 'https://deno.land/std@0.89.0/path/mod.ts';
import { parse } from 'https://deno.land/std@0.89.0/encoding/toml.ts';
import * as color from 'https://deno.land/std@0.89.0/fmt/colors.ts';
import JSZip from 'https://jspm.dev/jszip@3.6.0';
// Get os specific properties
const { os } = Deno.build;
let home; // Which dir to write to
if (os === 'windows') {
  home = 'C:/Users/antoi';
} else if (os === 'linux') {
  home = Deno.env.get('HOME');
} else {
  throw `Unsupported os ${os}`;
}

// Parse config files

if (Deno.args.length == 0) {
  throw 'You must a config file path as argument';
}

const configFile = Deno.args[0];
const config = parse(Deno.readTextFileSync(configFile));

// Perform installation

println(color.bold(color.blue(`Start installing ${config.title}`)));

if (config.install) {
  // Prepare dest dir
  const path = join(home, config.install.dir);
  await ensureDir(path);

  // Handle github repos
  for (const item of config.install.github ?? []) {
    try {
      print(color.magenta(`Github repo ${item.repo} - `));
      // Fetch last release metadata
      const result = await fetch(
        `https://api.github.com/repos/${item.repo}/releases/${
          item.tag ? `tags/${item.tag}` : 'latest'
        }`
      );
      const json = await result.json();
      if (result.status != 200) {
        throw json.message;
      }

      // Find the matching asset
      const pat = new RegExp(item.pattern ?? '.*');
      const match = json.assets.filter(asset => pat.test(asset.name));
      if (match.length == 0) {
        throw `Found no assets matching ${pat}`;
      } else if (match.length > 1) {
        throw `Found many assets matching ${pat}: ${match.map(it => it.name)}`;
      }

      await handleUrl(item, match[0].browser_download_url, path);
    } catch (error) {
      println(color.red(`ERR\n${error}`));
    }
  }

  // Handle raw url
  for (const item of config.install.url ?? []) {
    try {
      await handleUrl(item, item.url, path);
    } catch (error) {
      println(color.red(`ERR\n${error}`));
    }
  }

  if (config.install.go) {
    if (await check('go version')) {
      for (const url of config.install.go ?? []) {
        try {
          println(color.magenta(`Install go ${fileName(url)} >`));
          await exec(`go install ${url}`);
        } catch (error) {
          println(color.red(error));
        }
      }
    } else {
      println(color.red('Can not execute go command'));
    }
  }
  if (config.install.cargo) {
    if (await check('cargo --version')) {
      for (const name of config.install.cargo.crate ?? []) {
        try {
          println(color.magenta(`Install rust ${name} >`));
          await exec(`cargo install ${name}`);
        } catch (error) {
          println(color.red(error));
        }
      }
      for (const url of config.install.cargo.git ?? []) {
        try {
          println(color.magenta(`Install rust ${fileName(url)} >`));
          await exec(`cargo install --git ${url}`);
        } catch (error) {
          println(color.red(error));
        }
      }
    } else {
      println(color.red('Can not execute cargo command'));
    }
  }
}

async function fetchAsArray(url) {
  return new Uint8Array(await (await fetch(url)).arrayBuffer());
}

function fileName(url) {
  return url.substring(url.lastIndexOf('/') + 1);
}

async function println(msg) {
  await print(msg + '\n');
}

async function print(msg) {
  await Deno.stdout.write(new TextEncoder().encode(msg));
}

async function exec(cmd) {
  const p = Deno.run({ cmd: cmd.split(' ') });
  return (await p.status()).success;
}

async function check(cmd) {
  const p = Deno.run({
    cmd: cmd.split(' '),
    stderr: 'null',
    stdin: 'null',
    stdout: 'null',
  });
  return (await p.status()).success;
}

/** Apply action from item to url */
async function handleUrl(item, url, path) {
  if (item.action == 'copy') {
    // Copy the file
    const name = item.name ?? fileName(url);
    print(color.magenta(`Copy file ${name} - `));
    await copy(url, name, path);
    println(color.green(`OK`));
  } else if (item.action == 'unzip') {
    // Unzip archive
    print(color.magenta(`Unzip ${fileName(url)} - `));
    await unzip(url, item.root ?? null, item.flatten ?? false, path);
    println(color.green(`OK`));
  } else {
    throw `Unknown action ${item.action}`;
  }
}

/** Copy a file fetched from url to dist */
async function copy(url, name, dist) {
  const content = await fetchAsArray(url);
  await Deno.writeFile(join(dist, name), content);
}

/** Unzip files fetched from url to dist */
async function unzip(url, root, flatten, dist) {
  const zipper = new JSZip();
  const zip = await fetchAsArray(url);
  await zipper.loadAsync(zip);
  for (const f of Object.values(zipper.files)) {
    if (flatten) {
      // Remove dir hierarchy
      f.name = basename(f.name);
    } else if (root) {
      // Replace root folder
      f.name = join(root, f.name.substring(f.name.indexOf('/') + 1));
    }
    const path = join(dist, f.name);
    if (!f.dir) {
      // Write file
      const content = await f.async('uint8array');
      await Deno.writeFile(path, content);
    } else if (!flatten) {
      // Write dir only if not flatten
      await ensureDir(path);
    }
  }
}
