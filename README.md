# Pirógrafos Chilenos — Pirograbador hecho en Chile

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite) ![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router) ![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js) ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-hosting-222222?logo=github) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?logo=github-actions) ![AWS S3](https://img.shields.io/badge/AWS_S3-orange?logo=amazon-s3) ![CloudFront](https://img.shields.io/badge/CloudFront-CDN-orange?logo=amazon-aws) ![API Gateway](https://img.shields.io/badge/API_Gateway-FF9900?logo=amazon-aws) ![Lambda](https://img.shields.io/badge/Lambda-Node.js-FF9900?logo=awslambda) ![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?logo=amazon-dynamodb) ![MercadoPago](https://img.shields.io/badge/MercadoPago-Checkout-00B1EA?logo=mercadopago) ![Instrument Sans](https://img.shields.io/badge/Fonts-Instrument_Sans_+%20Fragment_Mono-lightgrey)

> Venta directa de fábrica. 15 años fabricando la herramienta que usan artesanos de Arica a Punta Arenas. Caja plateada, LED naranjo, 220V · 0–6A, 6 puntas Cantal 1.0mm. Despacho incluido + factura electrónica.

**Live:** https://seebajun.github.io/pirografoschilenos/

---

## Qué es y qué pretendemos

Sitio de una sola marca y un solo producto: el **Pirograbador Profesional ($95.200 CLP)**. Sin intermediarios, sin catálogo infinito. La web tiene un único trabajo: llevar a un artesano a confiar y comprar en 2 clics.

**Fase actual (este repo):** web 100% estática, rápida, optimizada para celular, con flujo de compra completo en el frontend. El pago real hoy es vía MercadoPago y WhatsApp; el backend aún es mock (localStorage) para poder desplegar ya a producción sin infraestructura.

**Siguiente fase (serverless AWS):** misma web estática, pero cada compra pasa por **API Gateway → Lambda Node.js → DynamoDB**. Nada de servidores, nada que mantener. El objetivo es guardar orden, cliente y estado de pago con trazabilidad completa y escalar a 0 costo cuando no hay ventas.

```
Navegador (S3 + CloudFront)
   │  POST /create-preference  {datos cliente + carrito}
   ▼
API Gateway (HTTP API)
   ├─► Lambda: create-preference (Node.js)
   │     ├─ valida, genera orderId PG-XXX
   │     ├─ crea preferencia MercadoPago (access_token en Secrets Manager)
   │     └─ PutItem DynamoDB → Orders + Payments + Customers
   │     └─ responde {orderId, preferenceId, init_point}
   │            ▼
   │     redirect a MercadoPago checkout
   │
   └─► Lambda: mp-webhook (POST /mp-webhook)
         └─ valida firma MP → UpdateItem payment status → Orders paid/shipped
```

## Stack

**Frontend**

- **React 19 + Vite 8 + React Router 7** — SPA con URLs limpias (`BrowserRouter` + `BASE_URL`)
- **CSS puro con design tokens** — sin Tailwind. Paleta taller: `veta #FCF0D1` / `carbon #14100E` / `plata #C9D1DB` / `led naranjo #FF6B00` + grain noise para evitar el cream genérico
- **Tipografía:** `Instrument Sans` (body/display) + `Fragment Mono` (labels técnicos)
- **Assets:** `sharp` + `pdf-to-img` para fotos optimizadas (`.webp`)
- **Lint:** `oxlint` — 0 warnings en CI

**Infra (actual y prevista)**

| Capa | Actual | Previsto AWS |
|------|--------|--------------|
| Hosting web | **GitHub Pages** (`/pirografoschilenos/` via Actions) | **S3 + CloudFront** (mismo `dist/`) |
| API | — (mock) | **API Gateway HTTP API** |
| Compute | — | **Lambda Node.js 22** (`create-preference`, `mp-webhook`, `get-order`) |
| DB | `localStorage` | **DynamoDB** (ver esquema abajo) |
| Pagos | Link WhatsApp + mock MP | **MercadoPago Checkout Pro** (preferenceId server-side) |
| Secretos | `.env` local | **Secrets Manager** (MP_ACCESS_TOKEN) |

**Tipografía y skills de diseño**

- Usamos el skill **`frontend-design`** de [`anthropics/skills`](https://github.com/anthropics/skills) (`npx skills add ... --skill frontend-design`) como guía de dirección artística: thesis en el hero, paleta anclada al taller, type pairing intencional y *signature* única.
- **Prueba tipográfica:** se evaluó `Tortilla` (woff2 artesanal en `src/assets/Tortilla.woff2`) como display para evocar lo hecho a mano. A pedido se retiró de **toda la página** (navbar, hero, cards, checkout) y quedó solo el sistema **Instrument Sans** (700 para títulos, 400/500 body) + **Fragment Mono** (11px, 0.14em, uppercase para labels técnicos, precios y badges). No queda ningún `@font-face` de Tortilla en `src/index.css`; el archivo físico permanece pero no se carga (build ya no emite `Tortilla.woff2`).
- La skill también motivó el cambio de `veta #F7F1E3 → #FCF0D1 + grain`, la eliminación de marcadores `— 01` decorativos y el “riesgo” de la marca quemada / potenciómetro interactivo (luego retirado) — todo documentado en el historial de commits.

## Estructura

```
src/
  App.jsx                // / , /comprar , /garantia
  pages/
    HomePage.jsx         // Hero + Productos + GuaranteeSection + Contacto
    CheckoutPage.jsx     // /comprar — formulario + resumen + mock MP
    GuaranteePage.jsx    // /garantia legacy (también sección en home)
  components/
    Hero/                // burn-divider, caja plateada, LED naranjo
    ProductsSection/     // ficha técnica + mosaico 2x2 plata
    GuaranteeSection/    // qué cubre / qué no cubre
    Card/, Navbar/, ContactSection/, Footer/
  data/
    products.js          // specs, precio, nombre
    contact.js           // whatsappLink()
  assets/photos/         // pirografo_01.webp + trabajos piro
```

**Rutas**

- `/` — hero + producto + garantía + contacto
- `/comprar` — checkout completo (nombre, email, WhatsApp, RUT opcional, dirección, comuna, región, notas). Valida, genera `orderId PG-XXXX` y `preferenceId MP-MOCK-...`, guarda en `localStorage` hasta tener Lambda.
- `/#productos`, `/#garantia`, `/#contacto` — anchors con `ScrollManager`
- `/garantia` — página legacy, redirige a `/#garantia`

## Flujo de compra (hoy → mañana)

**Hoy (estático):**

1. Usuario llena `/comprar` → `validate()` inline (mensajes en voz activa, no “Requerido”)
2. `genOrderId()` + payload → `localStorage pirografos_orders`
3. Pantalla éxito con `init_point` mock y bloque `Payload que enviará a Lambda (debug)` para testear backend sin tocar frontend

**Mañana (Lambda):**

```js
// POST /create-preference
{ nombre, email, telefono, rut, direccion, comuna, region, notas }
// → Lambda responde
{ orderId, preferenceId, init_point: "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=..." }
// → frontend hace window.location = init_point
```

## DynamoDB — esquema previsto

**Orders** — PK `orderId` (S `PG-XXXX`), GSI `email-index` (PK `email`, SK `createdAt`)
```json
{ "orderId": "PG-...", "email": "camila@...", "total": 95200, "moneda": "CLP",
  "estado": "pending_payment | paid | shipped", "preferenceId": "MP-...", "paymentId": "...",
  "cliente": { "nombre","rut","direccion","comuna","region","telefono" }, "createdAt": "..." }
```

**Payments** — PK `preferenceId`, SK `paymentId`
```json
{ "preferenceId": "MP-...", "paymentId": "123456", "token": "opaco", "estado": "approved", "raw": {...} }
```

**Customers** — PK `email`
```json
{ "email": "camila@...", "nombre": "Camila Rojas", "telefono": "+56...", "direcciones": [...] }
```

Tokens de MP **nunca** en el cliente. Solo en Lambda + DynamoDB.

## Desarrollo local

```bash
npm ci
npm run dev      # http://localhost:5173/pirografoschilenos/
npm run build    # → dist/
npm run lint     # oxlint
```

**Variables `.env`** (ver `.env.example`):

```
VITE_WHATSAPP_NUMBER=569XXXXXXXX
VITE_API_URL=https://xxxx.execute-api.sa-east-1.amazonaws.com
```

Sin `VITE_API_URL`, `/comprar` usa el mock local — ideal para diseñar sin AWS.

## Tests

**Stack:** `vitest 4` + `jsdom 30` + `@testing-library/react 16` + `@testing-library/jest-dom` + `@testing-library/user-event`. Config en `vite.config.js:7` (`test.environment: 'jsdom'`, `setupFiles: ['./src/test/setup.js']`, `globals: true`) y setup `src/test/setup.js:1` (`import '@testing-library/jest-dom/vitest'`).

```bash
npm test          # vitest run — 5 suites / 15 tests (4.6s)
npm run test:watch # modo watch
```

**Qué se testea (15 tests):**

| Suite | Archivo | Qué verifica |
|-------|---------|--------------|
| `whatsappLink` | `src/data/contact.test.js:1` | `whatsappLink()` genera `https://wa.me/<VITE_WHATSAPP_NUMBER>?text=encodeURIComponent(msg)` con caracteres especiales |
| `products` | `src/data/products.test.js:1` | `product.nombre/precio/specs` y que specs contienen `Potenciómetro/220V/Cantal` |
| `Button` | `src/components/Button/Button.test.jsx:1` | `to` → `<Link>`, `to="/#productos"` hace `scrollIntoView` + `pushState`, `href` → `<a>` (usa `MemoryRouter` + mock `Element.prototype.scrollIntoView`) |
| `HomePage` | `src/pages/HomePage.test.jsx:1` | render hero + ficha + garantía + contacto; `Comprar` sin precio (`queryByText 'Comprar — $95.200'` null); `Ver garantía` con clase `btn` igual que `Ver el producto` (no `btn--ghost`) |
| `CheckoutPage` | `src/pages/CheckoutPage.test.jsx:1` | render form+resumen+cantidad; `+`/`−` actualiza `ρ = cantidad×95200` (`$95.200→$190.400`, clamp 1–10); validación muestra `Escribe tu nombre completo/Revisa el email`; flujo completo crea orden `PG-...` en `localStorage pirografos_orders` y pantalla `Orden creada — ahora paga` con `cantidad×precioUnitario` |

> Nota jsdom: `Not implemented: Window's scrollTo()` en `HomePage`/`CheckoutPage` es esperado — no afecta asserts.

## Deploy

**GitHub Pages (actual):** push a `main` → `.github/workflows/deploy.yml` hace `npm ci && npm run build` y `upload-pages-artifact` con `dist/`. Configurado con `vite.config.js: base: '/pirografoschilenos/'` + `404.html` fallback para SPA.

Migración a **S3 + CloudFront** es 1:1: mismo `dist/` + invalidación de CloudFront en CI. API queda en `api.pirografos.cl` (API Gateway) para no mezclar orígenes.

## Roadmap

- [x] Landing + ficha técnica + garantía + WhatsApp
- [x] `/comprar` con validación y resumen (mock)
- [x] Paleta plateada + LED naranjo, sin `Tortilla`
- [ ] `POST /create-preference` Lambda + DynamoDB
- [ ] `POST /mp-webhook` + actualización estado
- [ ] Panel admin lectura `/get-order?orderId=PG-...` (Lambda + GSI email)
- [ ] S3 + CloudFront + dominio + ACM

---

Hecho en taller, no en template. 15 años, 0 garantías cobradas, +1.000 clientes.
