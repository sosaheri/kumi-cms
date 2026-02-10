import { describe, it, expect, beforeEach } from 'vitest';
import Core, { closeModal } from '../lib/framework/core.js';

describe('Core basic functions', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('closeModal hides modal and restores scroll', () => {
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    const inner = document.createElement('div');
    inner.id = 'modal-content-inner';
    modal.appendChild(inner);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    closeModal();
    expect(modal.style.display).toBe('none');
    expect(document.body.style.overflow).toBe('auto');
  });

  it('show fallback adds banner when theme-root empty', async () => {
    Core._showThemeFallback('Test message');
    const root = document.getElementById('theme-root');
    expect(root).toBeTruthy();
    expect(root.textContent).toContain('Test message');
  });
});
