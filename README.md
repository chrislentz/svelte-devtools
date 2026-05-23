# Svelte DevTools

[![npm version](https://img.shields.io/npm/v/vite-plugin-svelte-devtools)](https://www.npmjs.com/package/vite-plugin-svelte-devtools)
[![license](https://img.shields.io/npm/l/vite-plugin-svelte-devtools)](./LICENSE)

A development-only panel for **Svelte 5** and **SvelteKit** apps. Inspect routes, browse the component tree, and watch reactive state — right in the browser. Press `⌘⇧D` (or `Ctrl⇧D`) to open.

> Only active during development (`apply: 'serve'`). Nothing is included in production builds.

## Features

- **Routes tab** — current route ID, URL, status code, route params, and page data from `load()`
- **Components tab** — live DOM tree with hover-to-highlight; click to expand/collapse subtrees
- **State tab** — SvelteKit `page` store + any component runes state you opt in to expose
- Resizable **bottom** or **right** drawer, position persisted across reloads
- Keyboard shortcut `⌘⇧D` / `Ctrl⇧D` to toggle open/close

## Installation

### SvelteKit

```bash
pnpm add -D vite-plugin-svelte-devtools @svelte-devtools/kit
```

**`vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteDevtools } from 'vite-plugin-svelte-devtools';

export default defineConfig({
  plugins: [sveltekit(), svelteDevtools()],
});
```

**`src/hooks.server.ts`**

```ts
import { sequence } from '@sveltejs/kit/hooks';
import { svelteDevtoolsHandle } from '@svelte-devtools/kit';

export const handle = sequence(svelteDevtoolsHandle);
```

> The SvelteKit handle is required because SvelteKit's SSR bypasses Vite's `transformIndexHtml`. The handle injects the devtools script tag via `transformPageChunk` instead.

### Vite + Svelte (no SvelteKit)

```bash
pnpm add -D vite-plugin-svelte-devtools
```

**`vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteDevtools } from 'vite-plugin-svelte-devtools';

export default defineConfig({
  plugins: [svelte(), svelteDevtools()],
});
```

No handle hook needed — the script is injected via `transformIndexHtml`.

## Exposing component state

The **State tab** automatically shows the SvelteKit `page` store. To also display local runes state from a component, push it to `window.__sdt` inside a `$effect`:

```ts
$effect(() => {
  (window as any).__sdt.componentState = { count, name };
  window.dispatchEvent(new CustomEvent('__sdt:update', { detail: { type: 'state' } }));
});
```

The devtools panel will pick this up and display it under **Component State** alongside the page store.

## Options

`svelteDevtools()` accepts an optional config object:

```ts
svelteDevtools({
  // allowedHosts: ['localhost', '0.0.0.0']  // reserved for future use
})
```

## Keyboard shortcut

| Shortcut | Action |
|---|---|
| `⌘⇧D` / `Ctrl⇧D` | Toggle the devtools panel |

The toggle button is always visible in the bottom-right corner of the page.

## Development

```bash
# 1. Clone and install
git clone https://github.com/chrislentz/svelte-devtools.git
cd svelte-devtools
pnpm setup          # installs deps + builds the overlay bundle

# 2. Start the playground
pnpm dev            # http://localhost:5173

# 3. Rebuild the overlay after making changes
pnpm build:overlay  # or: pnpm dev:overlay (watch mode, use alongside pnpm dev)
```

### Monorepo structure

```
packages/
  overlay/       — Svelte 5 panel UI (pre-built to dist/overlay.js, not published)
  vite-plugin/   — published as vite-plugin-svelte-devtools
  kit/           — published as @svelte-devtools/kit
playground/      — SvelteKit sandbox for manual testing
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) © Chris Lentz
