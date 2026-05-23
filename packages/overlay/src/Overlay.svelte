<script lang="ts">
  import Panel from './Panel.svelte';

  let isOpen    = $state(localStorage.getItem('sdt:open') === 'true');
  let height    = $state(parseInt(localStorage.getItem('sdt:height') ?? '320', 10));
  let width     = $state(parseInt(localStorage.getItem('sdt:width') ?? '380', 10));
  let position  = $state<'bottom' | 'right'>(
    (localStorage.getItem('sdt:position') as 'bottom' | 'right') ?? 'bottom'
  );

  $effect(() => { localStorage.setItem('sdt:open', String(isOpen)); });

  $effect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        isOpen = !isOpen;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  function onResize(v: number) {
    if (position === 'bottom') {
      height = v;
      localStorage.setItem('sdt:height', String(v));
    } else {
      width = v;
      localStorage.setItem('sdt:width', String(v));
    }
  }

  function onPositionChange(p: 'bottom' | 'right') {
    position = p;
    localStorage.setItem('sdt:position', p);
  }
</script>

<!-- Toggle button -->
<button
  class="sdt-toggle"
  class:sdt-toggle--open={isOpen}
  onclick={() => (isOpen = !isOpen)}
  title={isOpen ? 'Close Svelte DevTools (⌘⇧D)' : 'Open Svelte DevTools (⌘⇧D)'}
  aria-label="Toggle Svelte DevTools"
>
  {#if isOpen}
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512"><path d="M416.9 93.1c-41.1-58.9-122.4-76.3-181.2-38.9L132.5 120c-28.2 17.7-47.6 46.5-53.5 79.3-4.9 27.3-.6 55.5 12.3 80-8.8 13.4-14.9 28.5-17.7 44.2-5.9 33.4 1.8 67.8 21.6 95.4 41.2 58.9 122.4 76.3 181.2 38.9L379.6 392c28.2-17.7 47.6-46.5 53.5-79.3 4.9-27.3.6-55.5-12.3-80 8.8-13.4 14.9-28.4 17.7-44.2 5.8-33.4-1.9-67.8-21.6-95.4" style="fill:#ff3e00"/><path d="M225.6 424.5c-33.3 8.6-68.4-4.4-88-32.6-11.9-16.6-16.5-37.3-13-57.4.6-3.3 1.4-6.5 2.5-9.6l1.9-5.9 5.3 3.9c12.2 9 25.9 15.8 40.4 20.2l3.8 1.2-.4 3.8c-.5 5.4 1 10.9 4.2 15.3 5.9 8.5 16.5 12.4 26.5 9.8 2.2-.6 4.4-1.5 6.3-2.8l103.2-65.8c5.1-3.2 8.6-8.4 9.7-14.4 1.1-6.1-.3-12.3-3.9-17.3-5.9-8.5-16.5-12.4-26.5-9.8-2.2.6-4.4 1.5-6.3 2.8L252 291c-6.5 4.1-13.5 7.2-21 9.2-33.3 8.6-68.4-4.4-88-32.6-11.9-16.6-16.5-37.3-13-57.4 3.5-19.7 15.2-37 32.2-47.7l103.2-65.8c6.5-4.1 13.5-7.2 21-9.2 33.3-8.6 68.4 4.4 88 32.6 11.9 16.6 16.5 37.3 13 57.4-.6 3.3-1.4 6.5-2.5 9.6L383 193l-5.3-3.9c-12.2-9-25.9-15.8-40.4-20.2l-3.8-1.2.4-3.8c.5-5.4-1-10.9-4.2-15.3-5.9-8.5-16.5-12.4-26.5-9.8-2.2.6-4.4 1.5-6.3 2.8l-103.2 65.8c-5.1 3.2-8.6 8.4-9.7 14.4-1.1 6.1.3 12.3 3.9 17.3 5.9 8.5 16.5 12.4 26.5 9.8 2.2-.6 4.4-1.5 6.3-2.8L260 221c6.5-4.1 13.5-7.2 21-9.2 33.3-8.6 68.4 4.4 88 32.6 11.9 16.6 16.5 37.3 13 57.4-3.5 19.7-15.2 37-32.2 47.7l-103.2 65.8c-6.5 4.1-13.6 7.2-21 9.2" style="fill:#fff"/></svg>
  {/if}
</button>

<!-- Panel -->
{#if isOpen}
  <div
    class="sdt-panel-wrap"
    class:sdt-panel-wrap--right={position === 'right'}
    style={position === 'right' ? `width: ${width}px` : ''}
  >
    <Panel
      {height}
      {position}
      onClose={() => (isOpen = false)}
      {onResize}
      {onPositionChange}
    />
  </div>
{/if}
