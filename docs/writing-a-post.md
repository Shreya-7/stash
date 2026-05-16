# Writing a post

## 1. Create the file

```
src/content/posts/<category>/<slug>.md
```

- `<category>` must be one of `tech`, `fitness`, `thots`, `crafts` (see [adding a category](adding-a-category.md) to add more).
- `<slug>` becomes the URL: `src/content/posts/tech/foo.md` → `/posts/tech/foo/`.
- Use lowercase, hyphenated slugs. Don't change a slug after publishing — it breaks the permalink.

## 2. Frontmatter

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

## 3. Body

Standard markdown. Code fences get syntax highlighting via Shiki (built into Astro, no client JS).

````markdown
```ts
const x = 1;
```
````

## 4. Images and GIFs

Drop the image next to the markdown file, then reference it relatively:

```markdown
![alt text](./diagram.png)
```

Astro's image pipeline resizes and reformats automatically. For GIFs, drop them in `src/assets/posts/` and use the `<Image>` component if you want explicit width control — otherwise the markdown form is fine.

Keep individual images under ~1 MB where possible. The repo is the storage; GitHub repos get unhappy past ~1 GB total.

## 5. Drafts

Set `draft: true` in frontmatter. The post shows up in `npm run dev` but is excluded from production builds.

## 6. Publish

```bash
git add src/content/posts/<category>/<slug>.md
git commit -m "post: <title>"
git push
```

Once the deploy workflow is wired up, the push triggers a rebuild and the post is live in ~1 minute.
