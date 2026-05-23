<script lang="ts">
  import { untrack } from 'svelte';
  import JsonNode from './JsonNode.svelte';

  let {
    value,
    keyName = undefined,
    depth = 0,
  }: {
    value: unknown;
    keyName?: string;
    depth?: number;
  } = $props();

  let expanded = $state(untrack(() => depth < 2));

  const type = $derived.by(() => {
    if (value === null) return 'null';
    if (value instanceof URL) return 'url';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  });

  const entries = $derived.by((): [string, unknown][] => {
    if (type === 'object') return Object.entries(value as Record<string, unknown>);
    if (type === 'array') return (value as unknown[]).map((v, i) => [String(i), v]);
    return [];
  });

  const isEmpty = $derived(entries.length === 0);

  function displayString(): string {
    if (type === 'null') return 'null';
    if (type === 'url') return (value as URL).href;
    if (type === 'string') return `"${value}"`;
    if (type === 'boolean') return String(value);
    if (type === 'number') return String(value);
    return '';
  }

  function valClass(): string {
    if (type === 'null' || value === undefined) return 'sdt-json-null';
    if (type === 'url') return 'sdt-json-url';
    if (type === 'string') return 'sdt-json-str';
    if (type === 'number') return 'sdt-json-num';
    if (type === 'boolean') return 'sdt-json-bool';
    return '';
  }
</script>

<div class="sdt-json-row">
  <!-- Toggle button for objects/arrays -->
  {#if (type === 'object' || type === 'array') && !isEmpty}
    <button
      class="sdt-json-toggle"
      onclick={() => (expanded = !expanded)}
      aria-label={expanded ? 'Collapse' : 'Expand'}
    >{expanded ? '▾' : '▸'}</button>
  {:else}
    <span class="sdt-json-toggle"> </span>
  {/if}

  <!-- Key name -->
  {#if keyName !== undefined}
    <span class="sdt-json-key">"{keyName}"</span>
    <span class="sdt-json-colon">:</span>
  {/if}

  <!-- Value rendering -->
  {#if type === 'object'}
    {#if isEmpty}
      <span class="sdt-json-brace">{'{}'}</span>
    {:else if expanded}
      <span class="sdt-json-brace">{'{'}</span>
    {:else}
      <button class="sdt-json-toggle sdt-json-toggle--summary" onclick={() => (expanded = true)}>
        {'{'} <span class="sdt-json-count">{entries.length} prop{entries.length === 1 ? '' : 's'}</span> {'}'}
      </button>
    {/if}
  {:else if type === 'array'}
    {#if isEmpty}
      <span class="sdt-json-brace">{'[]'}</span>
    {:else if expanded}
      <span class="sdt-json-brace">{'['}</span>
    {:else}
      <button class="sdt-json-toggle sdt-json-toggle--summary" onclick={() => (expanded = true)}>
        {'['} <span class="sdt-json-count">{entries.length} item{entries.length === 1 ? '' : 's'}</span> {']'}
      </button>
    {/if}
  {:else}
    <span class="{valClass()}">{displayString()}</span>
  {/if}
</div>

<!-- Children -->
{#if (type === 'object' || type === 'array') && expanded && !isEmpty}
  <div class="sdt-json-children">
    {#each entries as [k, v]}
      <JsonNode value={v} keyName={k} depth={depth + 1} />
    {/each}
  </div>
  <div class="sdt-json-row">
    <span class="sdt-json-toggle"> </span>
    <span class="sdt-json-brace">{type === 'array' ? ']' : '}'}</span>
  </div>
{/if}
