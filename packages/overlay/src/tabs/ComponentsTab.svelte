<script lang="ts">
  interface NodeInfo {
    el: Element;
    tag: string;
    id: string;
    classes: string[];
    componentName: string | null;
    depth: number;
    childCount: number;
    key: string;
  }

  let nodes = $state<NodeInfo[]>([]);
  let highlightedEl = $state<Element | null>(null);
  let collapsed = $state(new Set<string>());

  const SKIP_TAGS = new Set(['script', 'style', 'link', 'meta', 'noscript', 'title', 'base', 'head']);
  const SKIP_IDS  = new Set(['__svelte-devtools__', 'sdt-styles']);

  function getComponentName(el: Element): string | null {
    const internal = (el as any).__svelte_component__;
    if (internal?.constructor?.name) return internal.constructor.name;
    const meta = (el as any).__svelte_meta;
    if (meta?.loc?.file) {
      const parts = meta.loc.file.split('/');
      const file = parts[parts.length - 1];
      return file.replace(/\.svelte$/, '');
    }
    if (el.tagName.includes('-')) return el.tagName.toLowerCase();
    return null;
  }

  function scanDom(): NodeInfo[] {
    const result: NodeInfo[] = [];
    let keyCounter = 0;

    function walk(el: Element, depth: number) {
      const tag = el.tagName.toLowerCase();
      if (SKIP_TAGS.has(tag)) return;
      if (SKIP_IDS.has(el.id)) return;

      const componentName = getComponentName(el);
      const classes = Array.from(el.classList).filter(c => !c.startsWith('svelte-'));

      result.push({
        el,
        tag,
        id: el.id,
        classes,
        componentName,
        depth,
        childCount: el.children.length,
        key: `node-${keyCounter++}`,
      });

      for (const child of el.children) {
        walk(child, depth + 1);
      }
    }

    walk(document.body, 0);
    return result;
  }

  $effect(() => {
    nodes = scanDom();

    const handler = () => { nodes = scanDom(); };
    window.addEventListener('__sdt:update', handler);
    return () => window.removeEventListener('__sdt:update', handler);
  });

  function highlight(el: Element | null) {
    if (highlightedEl && highlightedEl !== el) {
      (highlightedEl as HTMLElement).style.outline = '';
      (highlightedEl as HTMLElement).style.outlineOffset = '';
    }
    if (el) {
      (el as HTMLElement).style.outline = '2px solid #FF3E00';
      (el as HTMLElement).style.outlineOffset = '2px';
    }
    highlightedEl = el;
  }

  function toggleCollapse(key: string) {
    const next = new Set(collapsed);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    collapsed = next;
  }

  const visibleNodes = $derived.by(() => {
    const result: NodeInfo[] = [];
    const collapsedDepths = new Set<number>();
    for (const node of nodes) {
      // Remove any depths that are deeper than this node (they're no longer ancestors)
      for (const d of collapsedDepths) {
        if (d >= node.depth) collapsedDepths.delete(d);
      }
      if (collapsedDepths.size === 0) {
        result.push(node);
        if (collapsed.has(node.key)) collapsedDepths.add(node.depth);
      }
    }
    return result;
  });
</script>

<div class="sdt-components">
  {#each visibleNodes as node}
    {@const isCollapsed = collapsed.has(node.key)}
    <div
      class="sdt-dom-node"
      class:sdt-dom-node--highlighted={highlightedEl === node.el}
      style:padding-left="{12 + node.depth * 14}px"
      onmouseenter={() => highlight(node.el)}
      onmouseleave={() => highlight(null)}
      onfocus={() => highlight(node.el)}
      onblur={() => highlight(null)}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCollapse(node.key); }}
      role="treeitem"
      aria-selected={highlightedEl === node.el}
      tabindex={0}
    >
      <!-- Expand/collapse toggle -->
      {#if node.childCount > 0}
        <button
          class="sdt-dom-node-toggle"
          onclick={() => toggleCollapse(node.key)}
          aria-label={isCollapsed ? 'Expand' : 'Collapse'}
        >{isCollapsed ? '▸' : '▾'}</button>
      {:else}
        <span class="sdt-dom-node-toggle"> </span>
      {/if}

      <!-- Component name badge (Svelte 5 component root elements) -->
      {#if node.componentName}
        <span class="sdt-component-name">&lt;{node.componentName}&gt;</span>
        <span class="sdt-dom-tag-hint">({node.tag})</span>
      {:else}
        <span class="sdt-tag-name">&lt;{node.tag}&gt;</span>
      {/if}

      {#if node.id}
        <span class="sdt-attr-id">#{node.id}</span>
      {/if}

      {#if node.classes.length > 0}
        <span class="sdt-attr-cls">.{node.classes.slice(0, 3).join('.')}</span>
        {#if node.classes.length > 3}
          <span class="sdt-dom-overflow">+{node.classes.length - 3}</span>
        {/if}
      {/if}

      {#if node.childCount > 0 && isCollapsed}
        <span class="sdt-json-count">{node.childCount} child{node.childCount === 1 ? '' : 'ren'}</span>
      {/if}
    </div>
  {/each}

  {#if nodes.length === 0}
    <div class="sdt-empty">
      <span class="sdt-empty-icon">◈</span>
      <span>No elements found.</span>
    </div>
  {/if}
</div>
