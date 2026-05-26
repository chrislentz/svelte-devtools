# @svelte-devtools/kit

[![npm version](https://img.shields.io/npm/v/@svelte-devtools/kit?label=%40svelte-devtools%2Fkit)](https://www.npmjs.com/package/@svelte-devtools/kit)

SvelteKit handle hook for injecting the Svelte DevTools overlay into SSR-rendered pages. Required when using [`@svelte-devtools/vite-plugin`](https://www.npmjs.com/package/@svelte-devtools/vite-plugin) with SvelteKit.

> **Why is this needed?** SvelteKit's SSR renderer bypasses Vite's `transformIndexHtml` hook, so the devtools script can't be injected there. This package uses SvelteKit's `resolve` hook with `transformPageChunk` to inject it instead.

## Installation

```bash
npm install -D @svelte-devtools/vite-plugin @svelte-devtools/kit
```

## Setup

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

If you already have other handles, add `svelteDevtoolsHandle` to the sequence:

```ts
import { sequence } from '@sveltejs/kit/hooks';
import { svelteDevtoolsHandle } from '@svelte-devtools/kit';
import { myOtherHandle } from './my-handle';

export const handle = sequence(svelteDevtoolsHandle, myOtherHandle);
```

### Custom base path

If your app uses a non-root Vite/Kit base path, pass it to `createSvelteDevtoolsHandle`:

```ts
import { sequence } from '@sveltejs/kit/hooks';
import { createSvelteDevtoolsHandle } from '@svelte-devtools/kit';

export const handle = sequence(createSvelteDevtoolsHandle({ base: '/my-app/' }));
```

## License

[MIT](https://github.com/chrislentz/svelte-devtools/blob/main/LICENSE) © Chris Lentz
