<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{data.post.title} — Blog</title></svelte:head>

<article>
  <header>
    <div class="tag">{data.post.tag}</div>
    <h1>{data.post.title}</h1>
    <p class="meta">By {data.post.author} · {data.post.readTime} min read</p>
  </header>

  <div class="note">
    <strong>Tip:</strong> Check the Routes tab — the <code>slug</code> param is visible there.
  </div>

  <p>{data.post.excerpt}</p>
</article>

<style>
  article { max-width: 640px; }

  .tag {
    display: inline-block;
    background: rgba(255,62,0,0.12);
    color: #FF3E00;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 12px;
  }

  h1 {
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 800;
    margin: 0 0 10px;
    letter-spacing: -0.3px;
  }

  .meta { color: #6c7086; font-size: 13px; margin: 0 0 24px; }

  .note {
    background: #1a1d27;
    border: 1px solid #2d3148;
    border-left: 3px solid #FF3E00;
    border-radius: 0 8px 8px 0;
    padding: 12px 16px;
    font-size: 14px;
    color: #8892a4;
    margin-bottom: 24px;
  }

  code {
    background: #2d3148;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
    color: #cba6f7;
  }

  p { color: #8892a4; font-size: 15px; line-height: 1.7; }
</style>
