// Prefix internal paths with the configured `base` so links work both:
//   - locally (`base = '/'`)        → returns `/foo/`
//   - on GH project pages (`base = '/stash/'`) → returns `/stash/foo/`
//
// Always pass a path WITHOUT a leading slash (e.g. `u('posts/foo/')`).
// When we move to a custom domain, `base` becomes `/` and this helper still works.
const base = import.meta.env.BASE_URL; // always ends with '/'

export const u = (path: string = '') =>
  base + path.replace(/^\//, '');
