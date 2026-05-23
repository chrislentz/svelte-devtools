import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteDevtools } from '../packages/vite-plugin/src/index.ts';

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteDevtools(),
  ],
});
