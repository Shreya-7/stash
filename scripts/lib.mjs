import { readFile, readdir } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const configPath = join(root, 'src', 'content.config.ts');
export const postsDir = join(root, 'src', 'content', 'posts');
export const authorsDir = join(root, 'src', 'content', 'authors');

// Line queue — handles both TTY and piped stdin reliably (the readline/promises
// wrapper has a known bug where it hangs after the first question on piped input).
export function makeRl() {
  const rl = createInterface({ input: stdin, output: stdout, terminal: stdin.isTTY });
  const queue = [];
  const waiters = [];
  let closed = false;
  rl.on('line', (line) => {
    if (waiters.length) waiters.shift()(line);
    else queue.push(line);
  });
  rl.on('close', () => {
    closed = true;
    while (waiters.length) waiters.shift()('');
  });
  rl.nextLine = () =>
    new Promise((resolve) => {
      if (queue.length) resolve(queue.shift());
      else if (closed) resolve('');
      else waiters.push(resolve);
    });
  return rl;
}

export async function ask(rl, question, { required = true, default: def } = {}) {
  const suffix = def ? ` [${def}]` : '';
  while (true) {
    stdout.write(`${question}${suffix}: `);
    const raw = (await rl.nextLine()).trim();
    const value = raw || def || '';
    if (value || !required) return value;
    console.log('  (required — please enter a value)');
  }
}

export async function choose(rl, question, choices) {
  console.log(question);
  choices.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));
  while (true) {
    stdout.write(`choose 1-${choices.length}: `);
    const raw = (await rl.nextLine()).trim();
    const n = Number(raw);
    if (Number.isInteger(n) && n >= 1 && n <= choices.length) return choices[n - 1];
    console.log('  (invalid — pick a number from the list)');
  }
}

export function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function readCategories() {
  const src = await readFile(configPath, 'utf8');
  const m = src.match(/export const CATEGORIES\s*=\s*\[([^\]]*)\]/);
  if (!m) throw new Error('Could not find CATEGORIES tuple in content.config.ts');
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

export async function listAuthors() {
  const files = await readdir(authorsDir);
  return files.filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
