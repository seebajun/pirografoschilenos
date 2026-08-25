import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Button from './Button.jsx';

describe('Button', () => {
  it('renderiza Link cuando recibe to', () => {
    render(
      <MemoryRouter>
        <Button to="/comprar">Comprar</Button>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Comprar' })).toHaveAttribute('href', '/comprar');
  });

  it('renderiza anchor con hash y hace scroll', async () => {
    if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = vi.fn();
    const el = document.createElement('div');
    el.id = 'productos';
    document.body.appendChild(el);
    const spy = vi.spyOn(el, 'scrollIntoView').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Button to="/#productos">Ver el producto</Button>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: 'Ver el producto' });
    expect(link).toHaveAttribute('href', '/#productos');
    link.click();
    expect(spy).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it('renderiza <a> cuando recibe href', () => {
    render(
      <MemoryRouter>
        <Button href="https://example.com">Externo</Button>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Externo' })).toHaveAttribute('href', 'https://example.com');
  });
});
