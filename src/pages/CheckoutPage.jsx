import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./CheckoutPage.css";

const REGIONES = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana",
  "O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes",
];

const PRECIO_UNITARIO = 95200;

function formatCLP(n) {
  return "$" + n.toLocaleString("es-CL");
}

function genOrderId() {
  return "PG-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export default function CheckoutPage() {
  const [cantidad, setCantidad] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rut: "",
    direccion: "",
    comuna: "",
    region: "",
    notas: "",
    acepta: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const total = cantidad * PRECIO_UNITARIO;

  function update(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    const err = {};
    if (!form.nombre.trim()) err.nombre = "Escribe tu nombre completo";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Revisa el email";
    if (!form.telefono.trim() || form.telefono.replace(/\D/g, "").length < 8) err.telefono = "Revisa el teléfono";
    if (!form.direccion.trim()) err.direccion = "Escribe tu dirección";
    if (!form.comuna.trim()) err.comuna = "Escribe tu comuna";
    if (!form.region) err.region = "Elige tu región";
    if (!form.acepta) err.acepta = "Marca esta casilla para continuar";
    return err;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    setSubmitting(true);

    // Simula creación de orden — aquí irá POST a Lambda /create-preference
    const orderId = genOrderId();
    const payload = {
      orderId,
      producto: "Pirograbador Profesional",
      precioUnitario: PRECIO_UNITARIO,
      cantidad,
      precio: total,
      moneda: "CLP",
      cliente: { ...form },
      createdAt: new Date().toISOString(),
      // futuro: preferenceId de MercadoPago vendrá de Lambda
      preferenceId: "MP-MOCK-" + orderId,
      status: "pending_payment",
    };

    // Guarda pendiente en localStorage (para demo estática sin backend)
    try {
      const prev = JSON.parse(localStorage.getItem("pirografos_orders") || "[]");
      prev.push(payload);
      localStorage.setItem("pirografos_orders", JSON.stringify(prev));
    } catch {}

    // Simula latencia Lambda
    await new Promise((r) => setTimeout(r, 900));
    setResult(payload);
    setSubmitting(false);
    window.scrollTo(0, 0);
  }

  if (result) {
    return (
      <>
        <Navbar />
        <main className="checkout">
          <div className="wrap">
            <div className="checkout-success">
              <span className="mono" style={{ color: "var(--brasa)" }}>Orden lista · Te queda pagar</span>
              <h1>Orden creada — ahora paga.</h1>
              <p>
                Guardamos tu orden <strong>{result.orderId}</strong> para despacho. En
                producción aquí llamamos a <code>POST /create-preference</code> en Lambda, que guarda en DynamoDB y crea la preferencia de MercadoPago.
              </p>
              <div className="success-card">
                <div className="success-row">
                  <span className="mono">Preference ID (mock)</span>
                  <strong>{result.preferenceId}</strong>
                </div>
                <div className="success-row">
                  <span className="mono">Cantidad</span>
                  <strong>{result.cantidad} × {formatCLP(result.precioUnitario)}</strong>
                </div>
                <div className="success-row">
                  <span className="mono">Total</span>
                  <strong>{formatCLP(result.precio)} CLP</strong>
                </div>
                <div className="success-row">
                  <span className="mono">Email</span>
                  <span>{result.cliente.email}</span>
                </div>
                <div className="success-row">
                  <span className="mono">Despacho</span>
                  <span>{result.cliente.direccion}, {result.cliente.comuna} · {result.cliente.region}</span>
                </div>
              </div>
              <div className="checkout-actions">
                <a
                  className="btn btn--brasa"
                  href={`https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${result.preferenceId}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(ev) => {
                    ev.preventDefault();
                    alert("Flujo real: aquí redirigirías a MercadoPago con el preferenceId retornado por Lambda. DynamoDB guardaría {orderId, preferenceId, status='pending', cliente, token}. Webhook /mp-webhook actualizará a 'paid'.");
                  }}
                >
                  Ir a pagar con MercadoPago →
                </a>
                <Link className="btn btn--ghost" to="/">Volver al inicio</Link>
              </div>
              <details className="success-debug">
                <summary className="mono">Payload que enviará a Lambda (debug)</summary>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </details>
              <p className="mono" style={{ marginTop: 16, color: "var(--ceniza)", fontSize: 11, textTransform: "none", letterSpacing: 0 }}>
                Infra: S3 + CloudFront (este sitio) → API Gateway → Lambda Node.js (create-preference, mp-webhook) → DynamoDB: <code>Orders</code> (PK orderId, GSI email), <code>Payments</code> (preferenceId, paymentId, token, status), <code>Customers</code> (email PK, datos despacho). Tokens de MP solo en Lambda.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="checkout">
        <div className="wrap">
          <Link to="/#productos" className="checkout-back">← Volver al producto</Link>

          <div className="checkout-grid">
            <form className="checkout-form" onSubmit={onSubmit} noValidate>
              <span className="mono checkout-kicker">Despacho a todo Chile · Factura incluida</span>
              <h1>Completa tu compra</h1>
              <p className="checkout-desc">Te pedimos tu dirección para el despacho y tu email para la factura. En el siguiente paso pagas con MercadoPago — tarjetas, débito o transferencia.</p>

              <div className="form-grid">
                <label className="field">
                  <span className="field-label">Nombre completo *</span>
                  <input name="nombre" value={form.nombre} onChange={update} placeholder="Ej: Camila Rojas" autoComplete="name" />
                  {errors.nombre && <span className="field-error">{errors.nombre}</span>}
                </label>
                <label className="field">
                  <span className="field-label">Email *</span>
                  <input name="email" type="email" value={form.email} onChange={update} placeholder="camila@email.cl" autoComplete="email" />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </label>
                <label className="field">
                  <span className="field-label">WhatsApp / Teléfono *</span>
                  <input name="telefono" value={form.telefono} onChange={update} placeholder="+56 9 1234 5678" autoComplete="tel" />
                  {errors.telefono && <span className="field-error">{errors.telefono}</span>}
                </label>
                <label className="field">
                  <span className="field-label">RUT (opcional, para factura)</span>
                  <input name="rut" value={form.rut} onChange={update} placeholder="12.345.678-9" />
                </label>
                <label className="field field--full">
                  <span className="field-label">Dirección *</span>
                  <input name="direccion" value={form.direccion} onChange={update} placeholder="Calle, número, depto" autoComplete="street-address" />
                  {errors.direccion && <span className="field-error">{errors.direccion}</span>}
                </label>
                <label className="field">
                  <span className="field-label">Comuna *</span>
                  <input name="comuna" value={form.comuna} onChange={update} placeholder="Ej: Ñuñoa" />
                  {errors.comuna && <span className="field-error">{errors.comuna}</span>}
                </label>
                <label className="field">
                  <span className="field-label">Región *</span>
                  <select name="region" value={form.region} onChange={update}>
                    <option value="">Selecciona</option>
                    {REGIONES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.region && <span className="field-error">{errors.region}</span>}
                </label>
                <label className="field field--full">
                  <span className="field-label">Notas (opcional)</span>
                  <textarea name="notas" value={form.notas} onChange={update} rows={3} placeholder="Referencia, horario entrega, etc." />
                </label>
              </div>

              <label className="field-check">
                <input type="checkbox" name="acepta" checked={form.acepta} onChange={update} />
                <span>Acepto <Link to="/#garantia">términos y garantía de 1 año</Link> y autorizo el uso de mis datos para despacho y facturación.</span>
              </label>
              {errors.acepta && <span className="field-error" style={{ marginTop: -8 }}>{errors.acepta}</span>}

              <button className="btn btn--brasa checkout-submit" type="submit" disabled={submitting}>
                {submitting ? "Guardando datos…" : "Pagar con MercadoPago →"}
              </button>
              <span className="mono" style={{ color: "var(--ceniza)", fontSize: 10, display: "block", marginTop: 10, textTransform: "none", letterSpacing: 0 }}>
                Guardamos tus datos para el despacho y creamos la orden. Pagas en MercadoPago en el siguiente paso. Sin cobro hasta confirmar ahí.
              </span>
            </form>

            <aside className="checkout-summary">
              <div className="summary-card">
                <span className="mono summary-kicker">Resumen</span>
                <h3>Pirograbador Profesional</h3>
                <p className="summary-desc">Fabricación chilena · 220V/50Hz · 0–6A · 6 puntas Cantal 1,0 mm · Cable goma alta T° · Fusible 5A</p>

                <div className="qty-selector">
                  <span className="mono qty-label">Cantidad</span>
                  <div className="qty-controls">
                    <button type="button" className="qty-btn" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Disminuir cantidad">−</button>
                    <span className="qty-value" aria-live="polite">{cantidad}</span>
                    <button type="button" className="qty-btn" onClick={() => setCantidad((c) => Math.min(10, c + 1))} aria-label="Aumentar cantidad">+</button>
                  </div>
                  <span className="qty-price">{formatCLP(PRECIO_UNITARIO)} c/u</span>
                </div>

                <div className="summary-lines">
                  <div className="summary-line"><span>Pirografo × {cantidad}</span><span>{formatCLP(PRECIO_UNITARIO * cantidad)}</span></div>
                  <div className="summary-line"><span>Despacho nacional</span><span style={{ color: "var(--led)", fontWeight: 700 }}>Incluido</span></div>
                  <div className="summary-line"><span>Factura electrónica</span><span>Incluida</span></div>
                  <div className="summary-line summary-line--total"><span>Total</span><span>{formatCLP(total)} CLP</span></div>
                </div>
                <div className="summary-foot mono">
                  <span>15 años · 0 garantías</span>
                  <span>MercadoPago · Tarjetas</span>
                </div>
              </div>
              <div className="summary-trust">
                <span className="mono">Compra directa de fábrica</span>
                <p>Despacho incluido de Arica a Punta Arenas. Respuesta directa del fabricante por WhatsApp.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
