# stash

A small blog for daily learnings.

- `decisions/` — why we built it the way we did (ADRs)
- `docs/` — how to do things in it (guides)

## Stack

Astro static site → GitHub Pages. Posts are markdown files in this repo. No database, no backend. See [decisions/](decisions/) for why.

## Quick start

```bash
nvm use            # picks up .nvmrc (Node 22)
npm install
npm run dev        # http://localhost:4321
```

More detail in [docs/getting-started.md](docs/getting-started.md).
