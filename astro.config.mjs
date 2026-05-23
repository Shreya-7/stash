// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Public URL of the site. Used for canonical links, sitemap, RSS.
  site: 'https://shreya-7.github.io',

  // Subpath when served as a GitHub project page (https://<user>.github.io/<repo>/).
  // Remove this line when switching to a custom domain so the site serves from /.
  base: '/stash/',

  trailingSlash: 'always',
});
