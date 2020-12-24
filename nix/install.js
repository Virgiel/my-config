import { walkSync } from 'https://deno.land/std@0.82.0/fs/mod.ts';

const from = new URL('.', import.meta.url).pathname;
const to = '/etc/nixos/';

console.log('Copy config files');

for (const entry of walkSync(from)) {
  if (entry.isFile && entry.name != 'install.js') {
    Deno.copyFileSync(entry.path, to + entry.name);
  }
}

const p = Deno.run({ cmd: ['nixos-rebuild', 'switch'] });

if ((await p.status()).success) {
  console.log('Reboot');
  await Deno.run({ cmd: ['reboot'] }).status();
}
