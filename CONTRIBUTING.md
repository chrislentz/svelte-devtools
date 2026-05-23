# Contributing

Thanks for your interest in contributing to Svelte DevTools!

## Setup

```bash
git clone https://github.com/chrislentz/svelte-devtools.git
cd svelte-devtools
pnpm setup   # installs deps and builds the overlay
```

## Development workflow

Start the playground:

```bash
pnpm dev          # SvelteKit playground at localhost:5173
```

In a second terminal, watch-build the overlay UI:

```bash
pnpm dev:overlay  # rebuilds overlay.js on save, triggers browser reload
```

Changes to `packages/vite-plugin` or `packages/kit` take effect immediately (they're loaded as TypeScript source in dev).

## Project structure

| Directory | Description |
|---|---|
| `packages/overlay/` | Svelte 5 devtools panel UI — pre-built to `dist/overlay.js` |
| `packages/vite-plugin/` | Vite plugin (`vite-plugin-svelte-devtools`) |
| `packages/kit/` | SvelteKit handle hook (`@svelte-devtools/kit`) |
| `playground/` | SvelteKit test app |

See [CLAUDE.md](./CLAUDE.md) for a detailed architecture reference.

## CSS in the overlay

All styles for the panel live in `packages/overlay/src/styles.ts` as a plain string — there are no `<style>` blocks in any `.svelte` component. This avoids issues with Svelte's CSS extraction during the library build. All class names are prefixed `sdt-` to prevent collisions with the host app.

## Submitting changes

1. Fork the repo and create a branch: `git checkout -b my-feature`
2. Make your changes, run `pnpm build:overlay` to verify the bundle builds cleanly
3. Open a pull request with a clear description of what changed and why

## Reporting bugs

Open a [GitHub issue](https://github.com/chrislentz/svelte-devtools/issues) with:
- What you expected to happen
- What actually happened
- Your Svelte / SvelteKit / Vite versions
