import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

export const CATEGORIES = ['tech', 'fitness', 'thots', 'crafts'] as const;
export type Category = (typeof CATEGORIES)[number];

const authors = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: reference('authors'),
      category: z.enum(CATEGORIES),
      subcategory: z.string().optional(),
      date: z.coerce.date(),
      draft: z.boolean().default(false),
      cover: image().optional(),
      excerpt: z.string().optional(),
    }),
});

export const collections = { authors, posts };
