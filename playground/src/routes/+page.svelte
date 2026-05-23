<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let count = $state(0);
  let name = $state('world');
  let doubled = $derived(count * 2);

  const colors = ['#FF3E00', '#4fc3f7', '#a6e3a1', '#f9e2af', '#cba6f7'];
  let colorIdx = $state(0);

  $effect(() => {
    const sdt = (window as any).__sdt;
    if (!sdt) return;
    sdt.componentState = { count, name, doubled, colorIdx };
    window.dispatchEvent(new CustomEvent('__sdt:update', { detail: { type: 'state' } }));
  });
</script>

<svelte:head><title>Svelte DevTools Playground</title></svelte:head>

<div class="hero">
  <h1>Svelte <span style="color:#FF3E00">DevTools</span> Playground</h1>
  <p class="sub">
    Open the devtools panel below (or press <kbd>⌘⇧D</kbd>) to inspect this page.
  </p>
</div>

<div class="cards">
  <!-- Runes demo -->
  <section class="card">
    <h2>⚡ Runes State</h2>
    <p>These values are tracked via Svelte 5 runes. Watch them update in the <strong>State</strong> tab.</p>

    <div class="controls">
      <div class="row">
        <label>name</label>
        <input bind:value={name} placeholder="your name" />
      </div>
      <div class="row">
        <label>count</label>
        <div class="counter">
          <button onclick={() => count--}>−</button>
          <span class="count">{count}</span>
          <button onclick={() => count++}>+</button>
        </div>
      </div>
      <div class="row derived">
        <label>doubled</label>
        <span class="value">{doubled}</span>
      </div>
    </div>

    <p class="greeting">Hello, <strong style="color:#FF3E00">{name}</strong>! Count is {count}.</p>
  </section>

  <!-- Page data from server -->
  <section class="card">
    <h2>📦 Server Data</h2>
    <p>Loaded via <code>+page.server.ts</code> — visible in the <strong>Routes</strong> tab.</p>
    <div class="data-display">
      <div class="data-row">
        <span class="data-key">user.name</span>
        <span class="data-val">"{data.user.name}"</span>
      </div>
      <div class="data-row">
        <span class="data-key">user.role</span>
        <span class="data-val">"{data.user.role}"</span>
      </div>
      <div class="data-row">
        <span class="data-key">visits</span>
        <span class="data-val">{data.visits}</span>
      </div>
      <div class="data-row">
        <span class="data-key">timestamp</span>
        <span class="data-val">"{new Date(data.timestamp).toLocaleTimeString()}"</span>
      </div>
    </div>
  </section>

  <!-- Color picker (interactive) -->
  <section class="card">
    <h2>🎨 Interactive</h2>
    <p>Pick a color — hover the <strong>Components</strong> tab to see elements highlighted.</p>
    <div class="swatches">
      {#each colors as c, i}
        <button
          class="swatch"
          class:swatch--active={colorIdx === i}
          style:background={c}
          onclick={() => (colorIdx = i)}
          aria-label="Pick {c}"
        ></button>
      {/each}
    </div>
    <div class="color-preview" style:background={colors[colorIdx]}>
      <span>{colors[colorIdx]}</span>
    </div>
  </section>
</div>

<style>
  .hero {
    margin-bottom: 36px;
  }

  h1 {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    margin: 0 0 12px;
    letter-spacing: -0.5px;
  }

  .sub {
    color: #8892a4;
    font-size: 15px;
    margin: 0;
  }

  kbd {
    background: #2d3148;
    color: #e2e8f0;
    padding: 2px 7px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    border: 1px solid #45475a;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .card {
    background: #1a1d27;
    border: 1px solid #2d3148;
    border-radius: 12px;
    padding: 24px;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px;
  }

  p { color: #8892a4; font-size: 14px; margin: 0 0 16px; }

  code {
    background: #2d3148;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
    color: #a6e3a1;
  }

  .controls { display: flex; flex-direction: column; gap: 10px; }

  .row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  label {
    font-family: monospace;
    font-size: 12px;
    color: #cba6f7;
    width: 60px;
    flex-shrink: 0;
  }

  input {
    background: #0f1117;
    border: 1px solid #2d3148;
    border-radius: 6px;
    color: #e2e8f0;
    padding: 6px 10px;
    font-size: 13px;
    font-family: inherit;
    flex: 1;
    outline: none;
    transition: border-color 0.15s;
  }

  input:focus { border-color: #FF3E00; }

  .counter {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .counter button {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #2d3148;
    border: none;
    color: #e2e8f0;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.1s;
  }

  .counter button:hover { background: #3d4168; }

  .count {
    font-size: 20px;
    font-weight: 700;
    min-width: 32px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    color: #FF3E00;
  }

  .derived { opacity: 0.8; }
  .value { font-family: monospace; font-size: 14px; color: #fab387; }
  .greeting { font-size: 14px; color: #8892a4; margin-top: 14px; }

  .data-display { display: flex; flex-direction: column; gap: 6px; }

  .data-row {
    display: flex;
    gap: 10px;
    font-family: monospace;
    font-size: 12px;
  }

  .data-key { color: #cba6f7; width: 100px; flex-shrink: 0; }
  .data-val { color: #a6e3a1; }

  .swatches {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  .swatch {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    transition: transform 0.1s, border-color 0.1s;
  }

  .swatch:hover { transform: scale(1.1); }
  .swatch--active { border-color: white; transform: scale(1.15); }

  .color-preview {
    height: 64px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .color-preview span {
    font-family: monospace;
    font-size: 13px;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 3px rgba(0,0,0,0.4);
  }
</style>
