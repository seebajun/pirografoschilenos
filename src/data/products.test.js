import { describe, it, expect } from 'vitest';
import product from './products.js';

describe('products', () => {
  it('tiene datos basicos del pirografo', () => {
    expect(product.nombre).toBe('Pirograbador Profesional');
    expect(product.precio).toBe('$95.200');
    expect(product.specs.length).toBeGreaterThan(5);
  });

  it('specs incluyen datos tecnicos clave', () => {
    const specs = product.specs.join(' ');
    expect(specs).toMatch(/Potenciómetro|220V|Cantal/i);
  });
});
