import { defineConfig } from 'vite';

export default defineConfig({
  oxc: {
    jsx: {
      importSource: 'preact',
    }
  },
  build: {
    cssMinify: false,
  },
});
