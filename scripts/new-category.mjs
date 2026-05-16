#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { makeRl, ask, slugify, readCategories, configPath, postsDir } from './lib.mjs';

const rl = makeRl();

const raw = await ask(rl, 'new category name (e.g. cooking)');
const name = slugify(raw);
if (!name) { console.error('✗ invalid name'); process.exit(1); }

rl.close();

const existing = await readCategories();
if (existing.includes(name)) {
  console.error(`✗ category "${name}" already exists`);
  process.exit(1);
}

const src = await readFile(configPath, 'utf8');
const updated = src.replace(
  /(export const CATEGORIES\s*=\s*\[)([^\]]*)(\])/,
  (_, open, inner, close) => {
    const items = [...inner.matchAll(/'([^']+)'/g)].map((x) => x[1]);
    items.push(name);
    return `${open}${items.map((x) => `'${x}'`).join(', ')}${close}`;
  },
);
if (updated === src) {
  console.error('✗ failed to update CATEGORIES tuple in content.config.ts');
  process.exit(1);
}
await writeFile(configPath, updated);

const dir = join(postsDir, name);
await mkdir(dir, { recursive: true });

console.log(`\n✓ added "${name}" to CATEGORIES in src/content.config.ts`);
console.log(`✓ created ${dir.replace(process.cwd() + '/', '')}/`);
console.log('  next: npm run new:post');
