import type { Handle } from '@sveltejs/kit';

const VIRTUAL_ID = 'virtual:svelte-devtools';

export interface SvelteDevtoolsHandleOptions {
  base?: string;
}

function normalizeBase(base = '/') {
  if (!base || base === '/') return '';
  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

function scriptTag(base?: string) {
  return `<script type="module" src="${normalizeBase(base)}/@id/${VIRTUAL_ID}"></script>`;
}

/**
 * SvelteKit handle that injects the Svelte DevTools overlay into every HTML
 * page response. Add it to your hooks.server.ts:
 *
 * ```ts
 * import { sequence } from '@sveltejs/kit/hooks';
 * import { svelteDevtoolsHandle } from '@svelte-devtools/kit';
 * export const handle = sequence(svelteDevtoolsHandle);
 * ```
 *
 * For apps with a non-root Kit/Vite base path:
 *
 * ```ts
 * import { createSvelteDevtoolsHandle } from '@svelte-devtools/kit';
 * export const handle = sequence(createSvelteDevtoolsHandle({ base: '/my-app/' }));
 * ```
 */
export function createSvelteDevtoolsHandle(options: SvelteDevtoolsHandleOptions = {}): Handle {
  const tag = scriptTag(options.base);

  return ({ event, resolve }) =>
    resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace('</head>', `${tag}\n</head>`),
    });
}

export const svelteDevtoolsHandle = createSvelteDevtoolsHandle();
