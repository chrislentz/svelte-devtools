import { mount } from 'svelte';
import { CSS } from './styles.js';
import Overlay from './Overlay.svelte';

if (typeof document !== 'undefined') {
  let style = document.getElementById('sdt-styles') as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = 'sdt-styles';
    document.head.appendChild(style);
  }
  style.textContent = CSS;

  let container = document.getElementById('__svelte-devtools__');
  if (!container) {
    container = document.createElement('div');
    container.id = '__svelte-devtools__';
    document.body.appendChild(container);
    mount(Overlay, { target: container });
  }
}
