# Adding an author

No script for this yet — it's a one-time thing per author.

1. Create `src/content/authors/<handle>.json`:
   ```json
   {
     "name": "Full Name",
     "bio": "One-line bio (optional)."
   }
   ```
2. `<handle>` is what posts will reference in their frontmatter (`author: <handle>`). Use lowercase, no spaces.
3. The new author shows up in the nav and gets an author listing page at `/authors/<handle>/` after the next build.

If we end up onboarding new authors regularly, easy to add `npm run new:author`.
