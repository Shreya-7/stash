# GitHub Pages project subpath + `u()` URL helper

Date: 2026-05-19
Status: Accepted

## Context

Without a custom domain, GitHub Pages serves the `Shreya-7/stash` repo at `https://shreya-7.github.io/stash/` — a *project page* with `/stash/` in the URL path. Astro must be told about this via `base: '/stash/'` in `astro.config.mjs`, otherwise all internal links and asset URLs resolve relative to `/` and 404 in production.

Setting `base` does NOT automatically rewrite `href="/foo"` strings inside `.astro` templates — that's the author's responsibility.

## Decision

- `astro.config.mjs` sets `site: 'https://shreya-7.github.io'`, `base: '/stash/'`, `trailingSlash: 'always'`.
- `src/lib/url.ts` exports `u(path)` which prefixes any internal path with `import.meta.env.BASE_URL`.
- **Convention:** every internal link and asset URL in `.astro` files goes through `u()`. Pass paths *without* a leading slash: `u('posts/foo/')`, not `u('/posts/foo/')`.

## Consequences

- One file controls the base; the rest of the codebase doesn't hard-code `/stash/`.
- When we eventually move to a custom domain, the change is minimal.
- Discipline required: forgetting `u()` on a new link silently breaks in production. Mitigated by `grep -rn 'href={\?[`"]/' src/` returning empty.

## Alternatives considered

We considered several alternatives:

- Buying a custom domain now — deferred.
- Wrapping `<a>` in a `<Link>` component — slight overhead for a 6-file codebase.
- Post-processing HTML to rewrite links — too much magic for the size of the problem.
