#!/usr/bin/env node
import { writeFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import {
  makeRl, ask, choose, slugify,
  readCategories, listAuthors, postsDir, todayISO,
} from './lib.mjs';

const rl = makeRl();

const title = await ask(rl, 'title');
const slugDefault = slugify(title);
const slug = slugify(await ask(rl, 'slug', { default: slugDefault }));

const categories = await readCategories();
const category = await choose(rl, 'category:', categories);

const subcategory = (await ask(rl, 'subcategory (optional)', { required: false })).trim();

const authors = await listAuthors();
const author = await choose(rl, 'author:', authors);

const excerpt = await ask(rl, 'one-line excerpt (optional)', { required: false });

rl.close();

const dir = join(postsDir, category);
await mkdir(dir, { recursive: true });

const file = join(dir, `${slug}.md`);
try {
  await access(file);
  console.error(`\n✗ ${file} already exists. Aborting.`);
  process.exit(1);
} catch {}

const frontmatter = [
  '---',
  `title: ${title}`,
  `author: ${author}`,
  `category: ${category}`,
  ...(subcategory ? [`subcategory: ${subcategory}`] : []),
  `date: ${todayISO()}`,
  'draft: true',
  ...(excerpt ? [`excerpt: ${excerpt}`] : []),
  '---',
  '',
  'Write here.',
  '',
].join('\n');

await writeFile(file, frontmatter);

const rel = file.replace(process.cwd() + '/', '');
console.log(`\n✓ created ${rel}`);
console.log('  (frontmatter has draft: true — flip to false when ready to publish)');

const editor = process.env.EDITOR || process.env.VISUAL || 'vi';
console.log(`  opening in ${editor}…\n`);

const [cmd, ...args] = editor.split(/\s+/);
spawn(cmd, [...args, file], { stdio: 'inherit' }).on('exit', (code) => process.exit(code ?? 0));
