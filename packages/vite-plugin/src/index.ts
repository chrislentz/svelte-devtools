import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const overlayDir = resolve(__dirname, '..', '..', 'overlay', 'dist');

const VIRTUAL_ID         = 'virtual:svelte-devtools';
const RESOLVED_ID        = '\0virtual:svelte-devtools';
const OVERLAY_VIRTUAL_ID = 'virtual:svelte-devtools-overlay';
const OVERLAY_RESOLVED   = '\0virtual:svelte-devtools-overlay';

export interface SvelteDevtoolsOptions {
  allowedHosts?: string[];
}

/**
 * Vite plugin for Svelte DevTools.
 *
 * For SvelteKit projects, also add the handle hook to hooks.server.ts:
 *
 *   import { sequence } from '@sveltejs/kit/hooks';
 *   import { svelteDevtoolsHandle } from '@svelte-devtools/kit';
 *   export const handle = sequence(svelteDevtoolsHandle);
 */
export function svelteDevtools(_options: SvelteDevtoolsOptions = {}): Plugin {
  let isSvelteKit = false;
  let base = '/';

  return {
    name: 'vite-plugin-svelte-devtools',
    apply: 'serve',

    configResolved(config) {
      base = config.base ?? '/';
      isSvelteKit = config.plugins.some(
        (p) => typeof p.name === 'string' && p.name.includes('sveltekit'),
      );
    },

    configureServer(server) {
      const overlayFile = resolve(overlayDir, 'overlay.js');
      server.watcher.add(overlayFile);
      server.watcher.on('change', (file) => {
        if (file !== overlayFile) return;
        const mod = server.moduleGraph.getModuleById(OVERLAY_RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      });
    },

    resolveId(id) {
      if (id === VIRTUAL_ID)         return RESOLVED_ID;
      if (id === OVERLAY_VIRTUAL_ID) return OVERLAY_RESOLVED;
    },

    load(id, opts) {
      if (opts?.ssr) return;

      // ── Pre-built overlay Svelte 5 bundle ─────────────────────────────────
      if (id === OVERLAY_RESOLVED) {
        const p = resolve(overlayDir, 'overlay.js');
        if (!existsSync(p)) {
          return 'console.warn("[svelte-devtools] overlay.js missing — run: pnpm build:overlay")';
        }
        return readFileSync(p, 'utf-8');
      }

      // ── Bootstrap module ─────────────────────────────────────────────────
      // Imports the overlay + wires up SvelteKit store subscriptions so the
      // devtools panel stays in sync with navigation and page data.
      if (id === RESOLVED_ID) {
        const kitCode = isSvelteKit
          ? `
            import('$app/stores').then(({ page, navigating }) => {
              page.subscribe((v) => {
                window.__sdt.page = v;
                window.dispatchEvent(new CustomEvent('__sdt:update', { detail: { type: 'page' } }));
              });
              navigating.subscribe((v) => {
                window.__sdt.navigating = v;
                window.dispatchEvent(new CustomEvent('__sdt:update', { detail: { type: 'navigating' } }));
              });
            }).catch(() => {});
          `
          : '';

        return `
          import '${OVERLAY_VIRTUAL_ID}';

          window.__sdt = window.__sdt || {
            page: null,
            navigating: null,
            components: [],
          };

          ${kitCode}
        `;
      }
    },

    // For non-SvelteKit Vite apps, transformIndexHtml works fine.
    // SvelteKit bypasses this — use @svelte-devtools/kit handle instead.
    transformIndexHtml: {
      order: 'post',
      handler() {
        if (isSvelteKit) return []; // handled by the SvelteKit hook
        return [
          {
            tag: 'script',
            attrs: { type: 'module', src: `${base}@id/${VIRTUAL_ID}` },
            injectTo: 'head-prepend' as const,
          },
        ];
      },
    },
  };
}
