/**
 * Executable installation tools
 * Download, decompress and install files to appropriate places in a cross-platform way
 */

import { parse } from 'https://deno.land/std@0.100.0/encoding/toml.ts';
import * as color from 'https://deno.land/std@0.100.0/fmt/colors.ts';

// Parse config files

if (Deno.args.length == 0) {
  throw 'You must a config file path as argument';
}

const configFile = Deno.args[0];
const config = parse(Deno.readTextFileSync(configFile));

// Perform installation

println(color.bold(color.blue(`Start installing ${config.title}`)));

if (config.install) {
  if (config.install.scoop) {
    if (await check('scoop status')) {
      for (const item of config.install.scoop) {
        try {
          println(color.magenta(`Install scoop ${item} >`));
          await exec(`scoop install ${item}`);
        } catch (error) {
          println(color.red(error));
        }
      }
    } else {
      println(color.red('Can not execute scoop command'));
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
  try {
    const p = Deno.run({ cmd: cmd.split(' ') });
    return (await p.status()).success;
  } catch (e) {
    return false;
  }
}

async function check(cmd) {
  try {
    const p = Deno.run({
      cmd: cmd.split(' '),
      stderr: 'null',
      stdin: 'null',
      stdout: 'null',
    });
    return (await p.status()).success;
  } catch (e) {
    return false;
  }
}
