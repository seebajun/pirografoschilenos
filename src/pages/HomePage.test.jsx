import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage.jsx';

describe('HomePage', () => {
  it('renderiza hero, producto, garantia y contacto', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText('Pirograbador')).toBeInTheDocument();
    expect(screen.getByText(/Ficha técnica/)).toBeInTheDocument();
    expect(screen.getByText(/Garantía real/)).toBeInTheDocument();
    expect(screen.getByText(/Habla directo/)).toBeInTheDocument();
  });

  it('boton Comprar no muestra precio', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const comprarBtns = screen.getAllByRole('link', { name: /^Comprar$/ });
    expect(comprarBtns.length).toBeGreaterThan(0);
    // ninguno debe contener $95.200
    expect(screen.queryByText('Comprar — $95.200')).not.toBeInTheDocument();
  });

  it('boton Ver garantia usa mismo color que Ver el producto (btn carbon)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const verProducto = screen.getByRole('link', { name: /Ver el producto/ });
    const verGarantia = screen.getByRole('link', { name: /Ver garantía de 1 año/ });
    expect(verProducto.className).toContain('btn');
    expect(verGarantia.className).toContain('btn');
    expect(verGarantia.className).not.toContain('btn--ghost');
    expect(verGarantia.className).not.toContain('btn--brasa');
  });
});
