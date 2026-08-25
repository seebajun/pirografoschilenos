import { describe, it, expect, vi, beforeEach } from 'vitest';
import { whatsappLink } from './contact.js';

describe('whatsappLink', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '56912345678');
  });

  it('genera link wa.me con mensaje encodeado', () => {
    const link = whatsappLink('Hola, me interesa');
    expect(link).toContain('https://wa.me/');
    expect(link).toContain(encodeURIComponent('Hola, me interesa'));
  });

  it('maneja mensajes con caracteres especiales', () => {
    const link = whatsappLink('Hola! ¿precio?');
    expect(link).toContain('https://wa.me/');
    expect(link).toContain(encodeURIComponent('Hola! ¿precio?'));
  });
});
