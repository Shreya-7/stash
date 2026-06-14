import type { CollectionEntry } from 'astro:content';

// Whether a post should be listed/rendered.
// Drafts are visible while developing (`npm run dev`) but excluded from
// production builds, so work-in-progress posts never ship live.
export const isVisible = ({ data }: CollectionEntry<'posts'>) =>
  import.meta.env.DEV || !data.draft;
