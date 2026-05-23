<script lang="ts">
  interface PageData {
    url?: { href?: string; pathname?: string; search?: string };
    params?: Record<string, string>;
    route?: { id?: string | null };
    status?: number;
    data?: Record<string, unknown>;
    form?: unknown;
    error?: unknown;
    state?: Record<string, unknown>;
  }

  interface NavigatingData {
    from?: { url?: { pathname?: string }; route?: { id?: string | null } } | null;
    to?: { url?: { pathname?: string }; route?: { id?: string | null } } | null;
    type?: string;
    willUnload?: boolean;
  }

  let page = $state<PageData | null>(null);
  let navigating = $state<NavigatingData | null>(null);

  $effect(() => {
    const sync = () => {
      const sdt = (window as any).__sdt;
      page = sdt?.page ?? null;
      navigating = sdt?.navigating ?? null;
    };

    sync();
    window.addEventListener('__sdt:update', sync);
    return () => window.removeEventListener('__sdt:update', sync);
  });

  function statusClass(code?: number) {
    if (!code) return '';
    if (code < 300) return 'sdt-status-ok';
    if (code < 500) return 'sdt-status-warn';
    return 'sdt-status-err';
  }

  function valClass(v: unknown): string {
    if (v === null || v === undefined) return 'sdt-val-null';
    if (typeof v === 'number') return 'sdt-val-num';
    if (typeof v === 'boolean') return 'sdt-val-bool';
    if (typeof v === 'string' && (v.startsWith('http') || v.startsWith('/'))) return 'sdt-val-url';
    return '';
  }

  function display(v: unknown): string {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return v;
    return JSON.stringify(v);
  }
</script>

<div class="sdt-routes">
  {#if page}
    <!-- Navigating indicator -->
    {#if navigating}
      <div class="sdt-nav-indicator">
        <span class="sdt-spinner"></span>
        Navigating to <span class="sdt-mono" style="color:inherit">{navigating.to?.url?.pathname ?? '…'}</span>
      </div>
    {/if}

    <!-- Core route info -->
    <div>
      <div class="sdt-info-row">
        <span class="sdt-badge">Route</span>
        <code class="sdt-mono">{page.route?.id ?? '(unknown)'}</code>
      </div>
      <div class="sdt-info-row">
        <span class="sdt-badge">URL</span>
        <code class="sdt-mono sdt-val-url">{page.url?.pathname ?? '/'}{page.url?.search ?? ''}</code>
      </div>
      <div class="sdt-info-row">
        <span class="sdt-badge">Status</span>
        <code class="sdt-mono {statusClass(page.status)}">{page.status ?? '—'}</code>
      </div>
    </div>

    <!-- Params -->
    {#if page.params && Object.keys(page.params).length > 0}
      <div class="sdt-section">
        <div class="sdt-section-title">Route Params</div>
        <div class="sdt-kv">
          {#each Object.entries(page.params) as [k, v]}
            <span class="sdt-key">{k}</span>
            <code class="sdt-val sdt-val-str">"{v}"</code>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Page data -->
    {#if page.data && Object.keys(page.data).length > 0}
      <div class="sdt-section">
        <div class="sdt-section-title">Page Data</div>
        <div class="sdt-kv">
          {#each Object.entries(page.data) as [k, v]}
            <span class="sdt-key">{k}</span>
            <code class="sdt-val {valClass(v)}">{display(v)}</code>
          {/each}
        </div>
      </div>
    {:else if page.data}
      <div class="sdt-section">
        <div class="sdt-section-title">Page Data</div>
        <span style="color:#6c7086;font-size:12px">No data returned from load()</span>
      </div>
    {/if}

    <!-- Form data -->
    {#if page.form !== null && page.form !== undefined}
      <div class="sdt-section">
        <div class="sdt-section-title">Form Action Data</div>
        <code class="sdt-val" style="font-size:11px">{JSON.stringify(page.form, null, 2)}</code>
      </div>
    {/if}

    <!-- Error -->
    {#if page.error}
      <div class="sdt-section">
        <div class="sdt-section-title" style="color:#f38ba8">Page Error</div>
        <code class="sdt-val sdt-val-err">{JSON.stringify(page.error)}</code>
      </div>
    {/if}
  {:else}
    <div class="sdt-empty">
      <span class="sdt-empty-icon">⟨/⟩</span>
      <span>No SvelteKit page data detected.</span>
      <span style="color:#45475a;font-size:11px">Ensure the Vite plugin is installed in a SvelteKit project.</span>
    </div>
  {/if}
</div>
