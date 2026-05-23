<script lang="ts">
  import RoutesTab from './tabs/RoutesTab.svelte';
  import ComponentsTab from './tabs/ComponentsTab.svelte';
  import StateTab from './tabs/StateTab.svelte';

  let {
    height,
    position,
    onClose,
    onResize,
    onPositionChange,
  }: {
    height: number;
    position: 'bottom' | 'right';
    onClose: () => void;
    onResize: (v: number) => void;
    onPositionChange: (p: 'bottom' | 'right') => void;
  } = $props();

  type Tab = 'routes' | 'components' | 'state';

  let activeTab = $state<Tab>(
    (localStorage.getItem('sdt:tab') as Tab) ?? 'routes'
  );

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: 'routes',     icon: '⟨/⟩', label: 'Routes'     },
    { id: 'components', icon: '◈',   label: 'Components'  },
    { id: 'state',      icon: '{}',  label: 'State'       },
  ];

  function selectTab(id: Tab) {
    activeTab = id;
    localStorage.setItem('sdt:tab', id);
  }

  function startResize(e: MouseEvent) {
    const startVal = position === 'bottom' ? e.clientY : e.clientX;
    const startSize = height;
    e.preventDefault();

    const onMove = (e: MouseEvent) => {
      const delta = position === 'bottom'
        ? startVal - e.clientY          // drag up → taller
        : startVal - e.clientX;         // drag left → wider
      const next = Math.min(900, Math.max(180, startSize + delta));
      onResize(next);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }
</script>

<div
  class="sdt-panel"
  class:sdt-panel--right={position === 'right'}
  style={position === 'bottom' ? `height: ${height}px` : ''}
>
  <!-- Drag-to-resize handle -->
  <button
    class="sdt-resize-handle"
    class:sdt-resize-handle--right={position === 'right'}
    onmousedown={startResize}
    onkeydown={(e) => {
      if (position === 'bottom') {
        if (e.key === 'ArrowUp')   onResize(Math.min(900, height + 20));
        if (e.key === 'ArrowDown') onResize(Math.max(180, height - 20));
      } else {
        if (e.key === 'ArrowLeft')  onResize(Math.min(900, height + 20));
        if (e.key === 'ArrowRight') onResize(Math.max(180, height - 20));
      }
    }}
    aria-label="Resize panel"
    title="Drag to resize"
  ></button>

  <!-- Header -->
  <div class="sdt-header">
    <div class="sdt-logo" title="Svelte DevTools">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path d="M416.9 93.1c-41.1-58.9-122.4-76.3-181.2-38.9L132.5 120c-28.2 17.7-47.6 46.5-53.5 79.3-4.9 27.3-.6 55.5 12.3 80-8.8 13.4-14.9 28.5-17.7 44.2-5.9 33.4 1.8 67.8 21.6 95.4 41.2 58.9 122.4 76.3 181.2 38.9L379.6 392c28.2-17.7 47.6-46.5 53.5-79.3 4.9-27.3.6-55.5-12.3-80 8.8-13.4 14.9-28.4 17.7-44.2 5.8-33.4-1.9-67.8-21.6-95.4" style="fill:#ff3e00"/><path d="M225.6 424.5c-33.3 8.6-68.4-4.4-88-32.6-11.9-16.6-16.5-37.3-13-57.4.6-3.3 1.4-6.5 2.5-9.6l1.9-5.9 5.3 3.9c12.2 9 25.9 15.8 40.4 20.2l3.8 1.2-.4 3.8c-.5 5.4 1 10.9 4.2 15.3 5.9 8.5 16.5 12.4 26.5 9.8 2.2-.6 4.4-1.5 6.3-2.8l103.2-65.8c5.1-3.2 8.6-8.4 9.7-14.4 1.1-6.1-.3-12.3-3.9-17.3-5.9-8.5-16.5-12.4-26.5-9.8-2.2.6-4.4 1.5-6.3 2.8L252 291c-6.5 4.1-13.5 7.2-21 9.2-33.3 8.6-68.4-4.4-88-32.6-11.9-16.6-16.5-37.3-13-57.4 3.5-19.7 15.2-37 32.2-47.7l103.2-65.8c6.5-4.1 13.5-7.2 21-9.2 33.3-8.6 68.4 4.4 88 32.6 11.9 16.6 16.5 37.3 13 57.4-.6 3.3-1.4 6.5-2.5 9.6L383 193l-5.3-3.9c-12.2-9-25.9-15.8-40.4-20.2l-3.8-1.2.4-3.8c.5-5.4-1-10.9-4.2-15.3-5.9-8.5-16.5-12.4-26.5-9.8-2.2.6-4.4 1.5-6.3 2.8l-103.2 65.8c-5.1 3.2-8.6 8.4-9.7 14.4-1.1 6.1.3 12.3 3.9 17.3 5.9 8.5 16.5 12.4 26.5 9.8 2.2-.6 4.4-1.5 6.3-2.8L260 221c6.5-4.1 13.5-7.2 21-9.2 33.3-8.6 68.4 4.4 88 32.6 11.9 16.6 16.5 37.3 13 57.4-3.5 19.7-15.2 37-32.2 47.7l-103.2 65.8c-6.5 4.1-13.6 7.2-21 9.2" style="fill:#fff"/></svg>
      {#if position === 'bottom'}
        Svelte DevTools
      {/if}
    </div>

    <div class="sdt-tabs" role="tablist">
      {#each tabs as tab}
        <button
          class="sdt-tab"
          class:sdt-tab--active={activeTab === tab.id}
          onclick={() => selectTab(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          title={tab.label}
        >
          <span class="sdt-tab-icon">{tab.icon}</span>
          {#if position === 'bottom'}
            {tab.label}
          {/if}
        </button>
      {/each}
    </div>

    <!-- Position toggle -->
    <button
      class="sdt-position-toggle"
      onclick={() => onPositionChange(position === 'bottom' ? 'right' : 'bottom')}
      title={position === 'bottom' ? 'Move to right' : 'Move to bottom'}
      aria-label={position === 'bottom' ? 'Switch to right drawer' : 'Switch to bottom drawer'}
    >
      {#if position === 'bottom'}
        <!-- Icon: switch to right panel -->
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
          <rect x="8" y="1.5" width="4.5" height="11" rx="0.5" fill="currentColor"/>
        </svg>
      {:else}
        <!-- Icon: switch to bottom panel -->
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
          <rect x="1.5" y="8" width="11" height="4.5" rx="0.5" fill="currentColor"/>
        </svg>
      {/if}
    </button>

    <button class="sdt-close" onclick={onClose} title="Close (⌘⇧D)">✕</button>
  </div>

  <!-- Tab content -->
  <div class="sdt-content" role="tabpanel">
    {#if activeTab === 'routes'}
      <RoutesTab />
    {:else if activeTab === 'components'}
      <ComponentsTab />
    {:else}
      <StateTab />
    {/if}
  </div>
</div>
