import { defineConfig } from 'vite';

export default defineConfig({
  oxc: {
    jsx: {
      importSource: 'preact',
    },
  },
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
});
