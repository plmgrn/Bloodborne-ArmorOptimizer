import { defineConfig } from 'vitest/config';

// base: './' emits relative asset paths, which work unmodified on a GitHub Pages
// project site (https://<user>.github.io/<repo>/) without hardcoding the repo name here.
export default defineConfig({
  base: './',
  test: {
    environment: 'node',
  },
});
