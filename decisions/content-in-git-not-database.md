# Content stored as markdown files in git, not in a database

Date: 2026-05-16
Status: Accepted

## Context

Posts live as files in the repo rather than rows in a database. It affects how content is created, edited, versioned, backed up, and migrated.

## Decision

- Every post is a `.md` file under `src/content/posts/<category>/<slug>.md`. 
- Authors are JSON files under `src/content/authors/`. 
- Post images live under `src/assets/posts/` 

and are referenced from markdown. Astro processes them through its image pipeline at build time.

## Consequences

- Version history via Git
- Backups via Github
- No database to provision, secure, back up, or migrate
- Search is extremely simple
- Adding a post requires either a local clone or editing files via GitHub's web UI. Acceptable since the in-app editor requirement was dropped.

## Alternatives considered

- Supabase Postgres + Storage
- **Headless CMS (Sanity, Contentful)** — introduces a third-party dependency for content we'd rather own as files. Not warranted.
