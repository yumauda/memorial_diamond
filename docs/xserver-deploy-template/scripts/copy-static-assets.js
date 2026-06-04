import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const copies = [
  ['js', 'dist/js'],
  ['images/common', 'dist/images/common'],
];

for (const [from, to] of copies) {
  const src = join(rootDir, from);
  const dest = join(rootDir, to);

  if (!existsSync(src)) {
    continue;
  }

  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
}
