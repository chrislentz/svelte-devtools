<script lang="ts">
  import { page } from '$app/stores';
  let { children } = $props();
</script>

<nav>
  <a href="/" class:active={$page.route.id === '/'}>Home</a>
  <a href="/about" class:active={$page.route.id === '/about'}>About</a>
  <a href="/blog/hello-world" class:active={$page.route.id?.startsWith('/blog')}>Blog</a>
  <a href="/blog/svelte-5-runes" class:active={false}>Runes Post</a>
</nav>

<main>
  {@render children()}
</main>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; }
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
    background: #0f1117;
    color: #e2e8f0;
    min-height: 100dvh;
  }

  nav {
    display: flex;
    gap: 2px;
    padding: 12px 24px;
    background: #1a1d27;
    border-bottom: 1px solid #2d3148;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  nav a {
    color: #8892a4;
    text-decoration: none;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.1s, color 0.1s;
  }

  nav a:hover { background: #2d3148; color: #e2e8f0; }
  nav a.active { background: rgba(255,62,0,0.12); color: #FF3E00; }

  main {
    padding: 40px 24px;
    max-width: 860px;
    margin: 0 auto;
  }
</style>
