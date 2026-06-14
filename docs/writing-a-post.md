# Writing a post

## The fast way

```bash
npm run new:post
```

Interactive — asks for title, slug, category, subcategory, author, excerpt. Creates the file with `draft: true` frontmatter, creates a matching `<slug>/` folder for the post's images, and opens it in `$EDITOR` (falls back to `$VISUAL`, then `vi`).

```
$ npm run new:post
title: Notes on Vim macros
slug [notes-on-vim-macros]:
category:
  1. tech
  2. fitness
  3. thots
  4. crafts
choose 1-4: 1
subcategory (optional): vim
author:
  1. abhishek
  2. shreya
choose 1-2: 2
one-line excerpt (optional): Recording, replaying, and the @@ shortcut.

✓ created src/content/posts/tech/notes-on-vim-macros.md
  opening in nvim…
```

Then jump to [§ Body](#body) below.

## The manual way

### 1. Create the file

```
src/content/posts/<category>/<slug>.md       # the post
src/content/posts/<category>/<slug>/          # its images live here
```

- `<category>` must be one of `tech`, `fitness`, `thots`, `crafts` (see [adding a category](adding-a-category.md) to add more).
- `<slug>` becomes the URL: `src/content/posts/tech/foo.md` → `/posts/tech/foo/`.
- Use lowercase, hyphenated slugs. Don't change a slug after publishing — it breaks the permalink.
- Keep each post's images in a sibling folder named after the slug, so assets stay grouped per-post instead of piling up loose in the category folder.

### 2. Frontmatter

```yaml
---
title: A descriptive title
author: shreya            # must match a file in src/content/authors/
category: tech            # must match the folder name
subcategory: vim          # optional, free-form
date: 2026-05-16
draft: false              # optional, default false
excerpt: One-line teaser shown on listing pages and as OG description.
cover: ./cover.jpg        # optional, relative to the .md file
---
```

The build will fail loudly if `category` or `author` doesn't match a known value. That's the safety net.

## Body

Standard markdown. Code fences get syntax highlighting via Shiki (built into Astro, no client JS).

````markdown
```ts
const x = 1;
```
````

## Images, GIFs, videos

**Images and GIFs** — drop the file in the post's `<slug>/` folder, reference it relatively:

```markdown
![alt text](./<slug>/diagram.png)
```

(e.g. for `src/content/posts/tech/foo.md`, an image at `src/content/posts/tech/foo/diagram.png` is `![alt text](./foo/diagram.png)`). `npm run new:post` creates this folder for you.

Astro's image pipeline resizes and re-encodes automatically. GIFs stay GIFs (not re-encoded). If a GIF is over a few MB, export as `.mp4` instead — usually 10–50× smaller.

**Videos (short, self-hosted)** — drop the file in `public/videos/`, then in your markdown:

```markdown
<video src="/stash/videos/clip.mp4" controls muted playsinline></video>
```

The `/stash/` prefix is hardcoded because markdown doesn't go through the `u()` helper; one find-and-replace when we move to a custom domain.

**Videos (long, or large files)** — embed from YouTube/Vimeo with a raw `<iframe>`. Don't put big files in the repo.

**Size budget** — keep individual files under ~1 MB where possible. The repo is the storage; GitHub repos get unhappy past ~1 GB total.

## Drafts

Set `draft: true` in frontmatter. The post shows up in `npm run dev` but is excluded from production builds.

## Publish

```bash
git add src/content/posts/<category>/<slug>.md
git commit -m "post: <title>"
git push
```

The push triggers a rebuild and the post is live in ~1 minute. See [deploying](deploying.md) for what happens behind the scenes.
