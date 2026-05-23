import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteDevtools } from '../packages/vite-plugin/src/index.ts';

export default defineConfig({
  server: { port: 3001 },
  plugins: [
    sveltekit(),
    svelteDevtools(),
  ],
});
