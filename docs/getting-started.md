# Getting started

## Prerequisites

- **Node 22+**. The repo includes both `.nvmrc` (nvm) and `.tool-versions` (asdf) pinning `22.22.3`, so either tool will pick the right version automatically when you `cd` in.
  - nvm: `nvm install 22`
  - asdf: `asdf plugin add nodejs && asdf install nodejs 22.22.3`
- npm 10+ ships with Node 22.

> **Heads-up if you have both nvm and asdf:** asdf shims usually win on PATH, so `nvm use` won't help on its own. The `.tool-versions` file is what tells asdf to use Node 22 here.

## First run

```bash
git clone <repo>
cd stash
node --version     # should print v22.x
npm install
npm run dev        # http://localhost:4321
```

## Useful commands

| Command           | What it does                                               |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Local dev server with hot reload. Includes drafts.         |
| `npm run build`   | Production build into `dist/`. Excludes drafts.            |
| `npm run preview` | Serve the production build locally (sanity check).         |
| `npm run astro`   | Astro CLI passthrough. e.g. `npm run astro -- check`.      |

## Project structure

```
src/
  content.config.ts          # collection schemas (authors, posts)
  content/
    authors/<handle>.json    # one file per author
    posts/<category>/<slug>.md
  layouts/                   # Base.astro, Post.astro
  components/                # Nav, PostCard
  pages/                     # file-based routing (see docs/routes)
  styles/global.css          # single CSS file, design tokens at top
decisions/                   # ADRs — why
docs/                        # how-to guides — how
```

## Next

- [Writing a post](writing-a-post.md)
- [Adding a category](adding-a-category.md)
