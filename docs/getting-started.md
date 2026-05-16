# Getting started

## Prerequisites

- **Node 22+** (see `.nvmrc`). If you use nvm: `nvm install 22 && nvm use 22`. If you use asdf: `asdf install nodejs 22.22.3`.
- npm 10+ (ships with Node 22).

## First run

```bash
git clone <repo>
cd stash
nvm use            # reads .nvmrc
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
