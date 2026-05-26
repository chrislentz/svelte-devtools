# @svelte-devtools/vite-plugin

[![npm version](https://img.shields.io/npm/v/@svelte-devtools/vite-plugin?label=%40svelte-devtools%2Fvite-plugin)](https://www.npmjs.com/package/@svelte-devtools/vite-plugin)

Vite plugin that injects a floating devtools panel into your Svelte 5 or SvelteKit app during development. Inspect routes, hover-highlight components in the DOM tree, and track runes state — all without leaving the browser. Nothing is included in production builds.

## Installation

```bash
npm install -D @svelte-devtools/vite-plugin
```

For SvelteKit projects, also install the handle hook:

```bash
npm install -D @svelte-devtools/kit
```

## Setup

### SvelteKit

**`vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteDevtools } from '@svelte-devtools/vite-plugin';

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

> The `@svelte-devtools/kit` handle is required because SvelteKit's SSR bypasses Vite's `transformIndexHtml`. The handle injects the devtools script tag via `transformPageChunk` instead.

### Vite + Svelte (no SvelteKit)

```ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteDevtools } from '@svelte-devtools/vite-plugin';

export default defineConfig({
  plugins: [svelte(), svelteDevtools()],
});
```

No handle hook needed — the script is injected via `transformIndexHtml`.

## Features

- **Routes tab** — current route, URL, status, params, and `load()` data
- **Components tab** — live DOM tree with hover-to-highlight
- **State tab** — SvelteKit `page` store + any component runes state you expose
- Resizable **bottom** or **right** drawer, position persisted across reloads
- Toggle with `⇧ + ⌥ + D` (`Shift + Alt + D`)

## Exposing component state

The State tab automatically shows the SvelteKit `page` store. To also display local runes state from a component, push it to `window.__sdt` inside a `$effect`:

```ts
$effect(() => {
  (window as any).__sdt.componentState = { count, name };
  window.dispatchEvent(new CustomEvent('__sdt:update', { detail: { type: 'state' } }));
});
```

## License

[MIT](https://github.com/chrislentz/svelte-devtools/blob/main/LICENSE) © Chris Lentz
