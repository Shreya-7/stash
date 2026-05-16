# Adding or renaming categories and subcategories

## Add a subcategory

**Just use it.** Subcategories are free-form strings on a post's frontmatter:

```yaml
subcategory: macros
```

No code change needed. The listing page at `/categories/<category>/<subcategory>/` is generated automatically.

Caveat: typos silently create "new" subcategories (`marcos` ≠ `macros`). Skim `/categories/<your-category>/` occasionally and fix any strays.

## Add a category

Two steps:

1. Add the name to the `CATEGORIES` tuple in `src/content.config.ts`:
   ```ts
   export const CATEGORIES = ['tech', 'fitness', 'thots', 'crafts', 'cooking'] as const;
   ```
2. Create the folder: `src/content/posts/cooking/`.

The nav, category pages, and frontmatter validation all pick it up from the tuple. If you try to write `category: cooking` in a post without step 1, the build fails — by design.

## Rename a category

```bash
git mv src/content/posts/<old> src/content/posts/<new>
# edit src/content.config.ts to swap the name
# find/replace in existing posts' frontmatter
grep -rl "category: <old>" src/content/posts/ | xargs sed -i '' 's/category: <old>/category: <new>/g'
```

URLs change (`/categories/<old>/…` → `/categories/<new>/…`). If the blog is already public, that breaks bookmarks — consider whether you really want to rename.

## Remove a category

Reverse of adding. Make sure no posts still reference it first (`grep -r "category: <name>" src/content/posts/`).
