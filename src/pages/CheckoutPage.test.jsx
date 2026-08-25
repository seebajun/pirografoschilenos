import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CheckoutPage from './CheckoutPage.jsx';

function renderCheckout() {
  return render(
    <MemoryRouter>
      <CheckoutPage />
    </MemoryRouter>
  );
}

describe('CheckoutPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra formulario y resumen', () => {
    renderCheckout();
    expect(screen.getByText('Completa tu compra')).toBeInTheDocument();
    expect(screen.getByText('Pirograbador Profesional')).toBeInTheDocument();
    expect(screen.getByText('Cantidad')).toBeInTheDocument();
  });

  it('selector cantidad incrementa y decrementa total', async () => {
    renderCheckout();
    const plus = screen.getByLabelText('Aumentar cantidad');
    const minus = screen.getByLabelText('Disminuir cantidad');
    const value = () => screen.getByText('1', { selector: '.qty-value' }) || screen.getByText('2', { selector: '.qty-value' });

    // initial 1
    expect(screen.getByText('$95.200 CLP')).toBeInTheDocument();
    await userEvent.click(plus);
    expect(screen.getByText('2', { selector: '.qty-value' })).toBeInTheDocument();
    expect(screen.getByText('$190.400 CLP')).toBeInTheDocument();
    await userEvent.click(minus);
    expect(screen.getByText('1', { selector: '.qty-value' })).toBeInTheDocument();
  });

  it('no deja bajar de 1 y no pasa de 10', async () => {
    renderCheckout();
    const minus = screen.getByLabelText('Disminuir cantidad');
    await userEvent.click(minus);
    expect(screen.getByText('1', { selector: '.qty-value' })).toBeInTheDocument();
  });

  it('valida campos requeridos al intentar pagar', async () => {
    renderCheckout();
    const btn = screen.getByRole('button', { name: /Pagar con MercadoPago/ });
    await userEvent.click(btn);
    expect(await screen.findByText('Escribe tu nombre completo')).toBeInTheDocument();
    expect(screen.getByText('Revisa el email')).toBeInTheDocument();
  });

  it('crea orden y muestra pantalla de exito', async () => {
    renderCheckout();
    await userEvent.type(screen.getByPlaceholderText('Ej: Camila Rojas'), 'Camila Rojas');
    await userEvent.type(screen.getByPlaceholderText('camila@email.cl'), 'camila@test.cl');
    await userEvent.type(screen.getByPlaceholderText('+56 9 1234 5678'), '56912345678');
    await userEvent.type(screen.getByPlaceholderText('Calle, número, depto'), 'Alameda 123');
    await userEvent.type(screen.getByPlaceholderText('Ej: Ñuñoa'), 'Ñuñoa');
    await userEvent.selectOptions(screen.getByLabelText(/Región/), 'Metropolitana');
    await userEvent.click(screen.getByRole('checkbox'));

    const btn = screen.getByRole('button', { name: /Pagar con MercadoPago/ });
    await userEvent.click(btn);

    await waitFor(() => expect(screen.getByText(/Orden creada — ahora paga/)).toBeInTheDocument(), { timeout: 2000 });
    expect(screen.getByText(/Cantidad/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('pirografos_orders')).length).toBe(1);
  });
});
