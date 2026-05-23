<script lang="ts">
  import JsonNode from '../JsonNode.svelte';

  interface PageSnapshot {
    url: unknown;
    params: unknown;
    route: unknown;
    status: unknown;
    data: unknown;
    form: unknown;
    error: unknown;
    state: unknown;
  }

  let page = $state<PageSnapshot | null>(null);
  let componentState = $state<Record<string, unknown> | null>(null);

  $effect(() => {
    const sync = () => {
      const sdt = (window as any).__sdt;
      page = sdt?.page ?? null;
      componentState = sdt?.componentState ?? null;
    };

    sync();
    window.addEventListener('__sdt:update', sync);
    return () => window.removeEventListener('__sdt:update', sync);
  });

  const pageSections = $derived.by(() => {
    if (!page) return [];
    return [
      { key: 'url',    value: page.url    },
      { key: 'route',  value: page.route  },
      { key: 'params', value: page.params },
      { key: 'status', value: page.status },
      { key: 'data',   value: page.data   },
      { key: 'form',   value: page.form   },
      { key: 'error',  value: page.error  },
      { key: 'state',  value: page.state  },
    ].filter(s => s.value !== null && s.value !== undefined);
  });

  const componentEntries = $derived.by((): [string, unknown][] =>
    componentState ? Object.entries(componentState) : []
  );
</script>

<div class="sdt-state">
  {#if componentEntries.length > 0}
    <div class="sdt-state-section-label">Component State</div>
    {#each componentEntries as [k, v]}
      <JsonNode value={v} keyName={k} depth={0} />
    {/each}
  {/if}

  {#if pageSections.length > 0}
    <div class="sdt-state-section-label" style="margin-top: {componentEntries.length > 0 ? '12px' : '0'}">Page Store</div>
    {#each pageSections as section}
      <JsonNode value={section.value} keyName={section.key} depth={0} />
    {/each}
  {/if}

  {#if componentEntries.length === 0 && pageSections.length === 0}
    <div class="sdt-empty">
      <span class="sdt-empty-icon">{'{}'}</span>
      <span>No state data available.</span>
      <span style="color:#45475a;font-size:11px">SvelteKit page store not detected.</span>
    </div>
  {/if}
</div>
