import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { dev: false },
      emitCss: false,
    }),
  ],
  build: {
    lib: {
      entry: './src/app.ts',
      formats: ['es'],
      fileName: 'overlay',
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    codeSplitting: false,
  },
});
