<script lang="ts">
  import { untrack } from 'svelte';
  import JsonNode from './JsonNode.svelte';

  let {
    value,
    keyName = undefined,
    depth = 0,
    ancestors = [],
  }: {
    value: unknown;
    keyName?: string;
    depth?: number;
    ancestors?: readonly object[];
  } = $props();

  const MAX_DEPTH = 8;

  let expanded = $state(untrack(() => depth < 2));

  const isObjectLike = $derived(value !== null && (typeof value === 'object' || typeof value === 'function'));
  const isCircular = $derived(isObjectLike && ancestors.includes(value as object));
  const isMaxDepth = $derived(depth >= MAX_DEPTH);

  const type = $derived.by(() => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (value instanceof URL) return 'url';
    if (value instanceof Date) return 'date';
    if (value instanceof Error) return 'error';
    if (value instanceof Map) return 'map';
    if (value instanceof Set) return 'set';
    if (typeof Element !== 'undefined' && value instanceof Element) return 'element';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  });

  const entries = $derived.by((): [string, unknown][] => {
    if (isCircular || isMaxDepth) return [];
    if (type === 'array') return (value as unknown[]).map((v, i) => [String(i), v]);
    if (type === 'map') {
      return Array.from(value as Map<unknown, unknown>, ([k, v], i) => [String(k ?? i), v]);
    }
    if (type === 'set') {
      return Array.from(value as Set<unknown>, (v, i) => [String(i), v]);
    }
    if (type === 'error') {
      const error = value as Error;
      return [
        ['name', error.name],
        ['message', error.message],
        ['stack', error.stack],
      ].filter((entry): entry is [string, string] => entry[1] !== undefined);
    }
    if (type === 'element') {
      const el = value as Element;
      const className = typeof el.className === 'string' ? el.className : String(el.className);
      return [
        ['tagName', el.tagName.toLowerCase()],
        ['id', el.id],
        ['className', className],
      ].filter((entry): entry is [string, string] => entry[1] !== '');
    }
    if (type === 'object') {
      try {
        return Object.entries(value as Record<string, unknown>);
      } catch {
        return [];
      }
    }
    return [];
  });

  const isEmpty = $derived(entries.length === 0);
  const childAncestors = $derived(isObjectLike ? [...ancestors, value as object] : ancestors);

  function displayString(): string {
    if (type === 'null') return 'null';
    if (type === 'undefined') return 'undefined';
    if (type === 'url') return (value as URL).href;
    if (type === 'date') return Number.isNaN((value as Date).getTime()) ? 'Invalid Date' : (value as Date).toISOString();
    if (type === 'string') return `"${value}"`;
    if (type === 'boolean') return String(value);
    if (type === 'number') return String(value);
    if (type === 'bigint') return `${String(value)}n`;
    if (type === 'symbol') return String(value);
    if (type === 'function') return `[Function${(value as Function).name ? `: ${(value as Function).name}` : ''}]`;
    if (isCircular) return '[Circular]';
    if (isMaxDepth) return '[Max depth]';
    return '';
  }

  function valClass(): string {
    if (type === 'null' || type === 'undefined' || isCircular || isMaxDepth) return 'sdt-json-null';
    if (type === 'url' || type === 'date') return 'sdt-json-url';
    if (type === 'string') return 'sdt-json-str';
    if (type === 'number' || type === 'bigint') return 'sdt-json-num';
    if (type === 'boolean') return 'sdt-json-bool';
    return '';
  }

  function collectionStart() {
    if (type === 'array' || type === 'set') return '[';
    return '{';
  }

  function collectionEnd() {
    if (type === 'array' || type === 'set') return ']';
    return '}';
  }

  function collectionLabel() {
    if (type === 'array') return 'item';
    if (type === 'set') return 'item';
    if (type === 'map') return 'entry';
    return 'prop';
  }
</script>

<div class="sdt-json-row">
  <!-- Toggle button for objects/arrays -->
  {#if (type === 'object' || type === 'array' || type === 'map' || type === 'set' || type === 'error' || type === 'element') && !isEmpty && !isCircular && !isMaxDepth}
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
  {#if isCircular || isMaxDepth}
    <span class="{valClass()}">{displayString()}</span>
  {:else if type === 'object' || type === 'array' || type === 'map' || type === 'set' || type === 'error' || type === 'element'}
    {#if isEmpty}
      <span class="sdt-json-brace">{collectionStart()}{collectionEnd()}</span>
    {:else if expanded}
      <span class="sdt-json-brace">{collectionStart()}</span>
    {:else}
      <button class="sdt-json-toggle sdt-json-toggle--summary" onclick={() => (expanded = true)}>
        {collectionStart()} <span class="sdt-json-count">{entries.length} {collectionLabel()}{entries.length === 1 ? '' : 's'}</span> {collectionEnd()}
      </button>
    {/if}
  {:else}
    <span class="{valClass()}">{displayString()}</span>
  {/if}
</div>

<!-- Children -->
{#if (type === 'object' || type === 'array' || type === 'map' || type === 'set' || type === 'error' || type === 'element') && expanded && !isEmpty && !isCircular && !isMaxDepth}
  <div class="sdt-json-children">
    {#each entries as [k, v]}
      <JsonNode value={v} keyName={k} depth={depth + 1} ancestors={childAncestors} />
    {/each}
  </div>
  <div class="sdt-json-row">
    <span class="sdt-json-toggle"> </span>
    <span class="sdt-json-brace">{collectionEnd()}</span>
  </div>
{/if}
