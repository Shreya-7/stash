# Deploying

## How it works

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. Checks out the repo on an Ubuntu runner.
2. Installs Node (version pinned by `.nvmrc`) and runs `npm ci`.
3. Runs `npm run build` to produce `dist/`.
4. Uploads `dist/` as a Pages artifact and tells GitHub Pages to serve it.

Live URL: **https://shreya-7.github.io/stash/**.

## URL handling

The site is served at `/stash/`, not `/`. Astro is configured for this via `base: '/stash/'` in `astro.config.mjs`. **Every internal link in `.astro` files must go through the `u()` helper** in `src/lib/url.ts`:

```astro
---
import { u } from '../lib/url';
---
<a href={u('posts/foo/')}>...</a>        <!-- ✅ -->
<a href="/posts/foo/">...</a>            <!-- ❌ will 404 in production -->
```

Quick check before pushing:

```bash
grep -rn 'href={\?[`"]/' src/    # should print nothing
```

Why: see [the ADR](../decisions/gh-pages-project-subpath-and-url-helper.md).

## Common operations

### Local preview of what will be deployed

```bash
npm run build && npm run preview
```

Note: `preview` serves from `/` locally even though production serves from `/stash/`. So absolute-path links work in `preview` but break in production unless you use `u()`. Don't trust `preview` for URL correctness — trust `grep`.
