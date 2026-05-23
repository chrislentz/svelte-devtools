export const CSS = `
  #__svelte-devtools__ *,
  #__svelte-devtools__ *::before,
  #__svelte-devtools__ *::after {
    box-sizing: border-box;
  }

  .sdt-panel *,
  .sdt-panel *::before,
  .sdt-panel *::after {
    margin: 0;
    padding: 0;
  }

  #__svelte-devtools__ {
    position: fixed !important;
    inset: 0 !important;
    pointer-events: none !important;
    z-index: 2147483647 !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
    font-size: 13px !important;
    line-height: 1.5 !important;
    color-scheme: dark !important;
  }

  /* ── Toggle button ── */
  .sdt-toggle {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: fit-content;
    height: 36px;
    padding: 0 16px 0 10px;
    border-radius: 999px;
    background: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    pointer-events: auto;
    box-shadow:
      0 0 0 1px rgba(0 0 0 / 0.08),
      0 2px 6px rgba(0 0 0 / 0.15),
      0 8px 24px rgba(0 0 0 / 0.25);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    outline: none;
    color: #1e1e2e;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .sdt-toggle:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 24px rgba(0 0 0 / 0.35);
  }

  .sdt-toggle:active { transform: scale(0.97); }

  .sdt-toggle.sdt-toggle--open {
    background: #1e1e2e;
    box-shadow: 0 0 0 2px #FF3E00, 0 4px 16px rgba(0 0 0 / 0.4);
    color: white;
  }

  /* ── Panel wrapper ── */
  .sdt-panel-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: auto;
    animation: sdt-slide-up 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .sdt-panel-wrap--right {
    top: 0;
    left: auto;
    bottom: 0;
    right: 0;
    animation: sdt-slide-right 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes sdt-slide-up {
    from { transform: translateY(100%); opacity: 0.6; }
    to   { transform: translateY(0);    opacity: 1;   }
  }

  @keyframes sdt-slide-right {
    from { transform: translateX(100%); opacity: 0.6; }
    to   { transform: translateX(0);    opacity: 1;   }
  }

  /* ── Panel ── */
  .sdt-panel {
    background: #1e1e2e;
    color: #cdd6f4;
    display: flex;
    flex-direction: column;
    border-top: 2px solid #FF3E00;
    box-shadow: 0 -8px 40px rgba(0 0 0 / 0.6);
    user-select: none;
  }

  .sdt-panel--right {
    border-top: none;
    border-left: 2px solid #FF3E00;
    box-shadow: -8px 0 40px rgba(0 0 0 / 0.6);
    height: 100%;
  }

  /* ── Resize handle ── */
  .sdt-resize-handle {
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
    height: 8px;
    cursor: ns-resize;
    background: transparent;
    border: none;
    z-index: 1;
  }

  .sdt-resize-handle--right {
    top: 0;
    bottom: 0;
    left: -4px;
    right: auto;
    height: auto;
    width: 8px;
    cursor: ew-resize;
  }

  .sdt-resize-handle:hover { background: rgba(255 62 0 / 0.15); }

  /* ── Position toggle ── */
  .sdt-position-toggle {
    background: transparent;
    border: none;
    color: #45475a;
    width: 32px;
    height: 44px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.12s;
    flex-shrink: 0;
    margin-left: auto;
  }

  .sdt-position-toggle:hover { color: #9399b2; }

  /* ── Header ── */
  .sdt-header {
    display: flex;
    align-items: stretch;
    height: 44px;
    padding: 0;
    background: #13131f;
    border-bottom: 1px solid #252535;
    flex-shrink: 0;
  }

  .sdt-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    color: #e0e0e0;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
    border-right: 1px solid #252535;
  }

  /* ── Tab bar ── */
  .sdt-tabs {
    display: flex;
    align-self: stretch;
  }

  .sdt-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 16px;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #585b70;
    font-size: 12px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.12s, border-color 0.12s;
    pointer-events: auto;
  }

  .sdt-tab:hover { color: #9399b2; }

  .sdt-tab.sdt-tab--active {
    color: #cdd6f4;
    border-bottom-color: #FF3E00;
  }

  .sdt-tab-icon {
    font-size: 12px;
    opacity: 0.8;
  }

  /* ── Close button ── */
  .sdt-close {
    background: transparent;
    border: none;
    color: #45475a;
    font-size: 16px;
    width: 44px;
    height: 44px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.12s, background 0.12s;
    flex-shrink: 0;
    font-family: inherit;
  }

  .sdt-close:hover { color: #cdd6f4; background: #1e1e2e; }

  /* ── Content area ── */
  .sdt-content {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    scrollbar-width: thin;
    scrollbar-color: #313244 transparent;
  }

  /* ── Routes tab ── */
  .sdt-routes {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sdt-info-row {
    display: flex;
    align-items: baseline;
    gap: 16px;
    padding: 3px 0;
  }

  .sdt-badge {
    font-size: 10px;
    font-weight: 600;
    color: #45475a;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    width: 64px;
    flex-shrink: 0;
  }

  .sdt-mono {
    font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
    font-size: 12.5px;
    color: #89b4fa;
    word-break: break-all;
  }

  .sdt-status-ok   { color: #a6e3a1; }
  .sdt-status-warn { color: #f9e2af; }
  .sdt-status-err  { color: #f38ba8; }

  .sdt-section {
    border-top: 1px solid #252535;
    padding-top: 20px;
    margin-top: 14px;
  }

  .sdt-section-title {
    font-size: 10px;
    font-weight: 600;
    color: #45475a;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 12px;
  }

  .sdt-kv {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 20px;
    align-items: start;
  }

  .sdt-key {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #cba6f7;
    white-space: nowrap;
  }

  .sdt-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #cdd6f4;
    word-break: break-all;
  }

  .sdt-val-str    { color: #a6e3a1; }
  .sdt-val-num    { color: #fab387; }
  .sdt-val-bool   { color: #f9e2af; }
  .sdt-val-null   { color: #6c7086; font-style: italic; }
  .sdt-val-url    { color: #89b4fa; }
  .sdt-val-err    { color: #f38ba8; }

  /* ── Empty state ── */
  .sdt-empty {
    padding: 48px 24px;
    color: #45475a;
    font-size: 13px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .sdt-empty-icon { font-size: 32px; line-height: 1; }

  /* ── Components tab ── */
  .sdt-components {
    padding: 8px 0;
  }

  .sdt-dom-node {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 20px;
    cursor: default;
    transition: background 0.08s;
    user-select: none;
  }

  .sdt-dom-node:hover { background: #1a1a2e; }
  .sdt-dom-node--highlighted { background: #1e1e35; outline: 1px solid rgba(255 62 0 / 0.5); outline-offset: -1px; }

  .sdt-dom-node-toggle {
    background: transparent;
    border: none;
    color: #45475a;
    font-size: 10px;
    width: 14px;
    cursor: pointer;
    flex-shrink: 0;
    line-height: 1;
    font-family: inherit;
  }

  .sdt-tag-name    { color: #f38ba8; font-family: monospace; font-size: 12.5px; }
  .sdt-attr-id     { color: #89b4fa; font-family: monospace; font-size: 11.5px; }
  .sdt-attr-cls    { color: #a6e3a1; font-family: monospace; font-size: 11.5px; }
  .sdt-dom-tag-hint  { color: #45475a; font-size: 11px; margin-left: 4px; }
  .sdt-dom-overflow  { color: #45475a; font-size: 10px; }
  .sdt-component-name {
    color: #cba6f7;
    font-family: monospace;
    font-size: 12.5px;
    font-weight: 600;
  }

  /* ── State tab / JSON tree ── */
  .sdt-state {
    padding: 4px 0 16px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 12.5px;
  }

  .sdt-state-section-label {
    font-family: inherit;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #45475a;
    padding: 20px 20px 8px;
  }

  .sdt-json-row {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    padding: 3px 20px;
    cursor: default;
    transition: background 0.08s;
  }

  .sdt-json-row:hover { background: #1a1a2e; }

  .sdt-json-toggle {
    background: transparent;
    border: none;
    color: #45475a;
    font-size: 10px;
    width: 14px;
    cursor: pointer;
    flex-shrink: 0;
    line-height: 20px;
    font-family: monospace;
    padding: 0;
  }

  .sdt-json-toggle--summary { width: auto; color: #6c7086; }

  .sdt-json-toggle:hover { color: #9399b2; }

  .sdt-json-key  { color: #cba6f7; margin-right: 2px; }
  .sdt-json-colon { color: #45475a; margin-right: 6px; }
  .sdt-json-str  { color: #a6e3a1; }
  .sdt-json-num  { color: #fab387; }
  .sdt-json-bool { color: #f9e2af; }
  .sdt-json-null { color: #6c7086; font-style: italic; }
  .sdt-json-url  { color: #89b4fa; }
  .sdt-json-brace { color: #585b70; }
  .sdt-json-count { color: #45475a; font-size: 10px; margin-left: 4px; }

  .sdt-json-children { padding-left: 20px; }

  /* ── Navigating indicator ── */
  .sdt-nav-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255 62 0 / 0.08);
    border-radius: 8px;
    border: 1px solid rgba(255 62 0 / 0.2);
    color: #FF3E00;
    font-size: 12px;
  }

  .sdt-spinner {
    width: 10px;
    height: 10px;
    border: 2px solid rgba(255 62 0 / 0.3);
    border-top-color: #FF3E00;
    border-radius: 50%;
    animation: sdt-spin 0.6s linear infinite;
    flex-shrink: 0;
  }

  @keyframes sdt-spin {
    to { transform: rotate(360deg); }
  }

  /* ── Keyboard hint ── */
  .sdt-kbd {
    font-size: 10px;
    background: #313244;
    color: #6c7086;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid #45475a;
    font-family: monospace;
  }
`;
