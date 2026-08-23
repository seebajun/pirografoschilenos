import { whatsappLink } from "../../data/contact.js";
import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section id="contacto" className="contacto">
      <div className="wrap">
        <h2>Compra directa de fábrica</h2>
        <p>
          Atención directa del fabricante. Despacho incluido, factura
          electrónica y asesoría técnica permanente. Paga con MercadoPago o
          tarjetas bancarias.
        </p>
        <a
          className="btn"
          target="_blank"
          rel="noreferrer"
          href={whatsappLink(
            "Hola, me interesa el pirograbador de Pirógrafos Chilenos"
          )}
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
}
