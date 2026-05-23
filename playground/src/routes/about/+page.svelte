<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>About — Playground</title></svelte:head>

<h1>About</h1>
<p>This is a static page with no dynamic params — note the Routes tab shows no params.</p>

<div class="meta">
  <div class="row"><span>buildTime</span><code>{new Date(data.buildTime).toISOString()}</code></div>
  <div class="row"><span>version</span><code>{data.version}</code></div>
</div>

<style>
  h1 { font-size: 32px; font-weight: 800; margin: 0 0 12px; }
  p { color: #8892a4; font-size: 15px; margin: 0 0 24px; }

  .meta {
    background: #1a1d27;
    border: 1px solid #2d3148;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 400px;
  }

  .row {
    display: flex;
    gap: 12px;
    font-family: monospace;
    font-size: 13px;
  }

  .row span { color: #cba6f7; width: 90px; }

  code { color: #a6e3a1; }
</style>
