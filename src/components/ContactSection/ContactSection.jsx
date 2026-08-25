import WhatsAppButton from "../WhatsAppButton/WhatsAppButton.jsx";
import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section id="contacto" className="contacto">
      <div className="wrap contacto-grid">
        <div>
          <span className="mono" style={{ color: 'var(--brasa)', letterSpacing: '0.16em' }}>Compra directa de fábrica</span>
          <h2>Habla directo<br />con el fabricante.</h2>
          <p>
            Sin intermediarios. Despacho incluido en todo Chile, factura electrónica y asesoría técnica permanente.
            Paga con MercadoPago o tarjetas bancarias. Respondemos en el día.
          </p>
          <WhatsAppButton message="Hola, me interesa el pirograbador de Pirógrafos Chilenos">
            Escríbenos por WhatsApp
          </WhatsAppButton>
        </div>
        <div className="contacto-side">
          <div className="contacto-side-title">Qué incluye tu compra</div>
          <ul>
            <li><span>Pirografo</span><span>$95.200</span></li>
            <li><span>Puntas Cantal 1mm</span><span>6 unidades</span></li>
            <li><span>Despacho</span><span>Incluido</span></li>
            <li><span>Factura</span><span>Electrónica</span></li>
            <li><span>Garantía</span><span>1 año real</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
