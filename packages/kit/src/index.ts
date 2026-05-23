import type { Handle } from '@sveltejs/kit';

const VIRTUAL_ID = 'virtual:svelte-devtools';
const SCRIPT_TAG = `<script type="module" src="/@id/${VIRTUAL_ID}"></script>`;

/**
 * SvelteKit handle that injects the Svelte DevTools overlay into every HTML
 * page response. Add it to your hooks.server.ts:
 *
 * ```ts
 * import { sequence } from '@sveltejs/kit/hooks';
 * import { svelteDevtoolsHandle } from '@svelte-devtools/kit';
 * export const handle = sequence(svelteDevtoolsHandle);
 * ```
 */
export const svelteDevtoolsHandle: Handle = ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('</head>', `${SCRIPT_TAG}\n</head>`),
  });
