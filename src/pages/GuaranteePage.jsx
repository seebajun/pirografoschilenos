import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton.jsx";
import "./GuaranteePage.css";

const cubre = [
  "Transformador",
  "Regulador de temperatura",
  "Conexionado interno de la máquina",
];

const noCubre = [
  "Golpes en la caja reguladora",
  "Cortos circuitos por quemaduras en los cables",
  "Maltrato físico en mango y cables",
  "Intervención del producto por terceros",
  "Puntas y mango (desgaste natural por uso)",
  "Sobrecalentamiento por trabajos muy prolongados",
];

export default function GuaranteePage() {
  return (
    <>
      <Navbar />
      <main className="garantia">
        <div className="wrap">
          <Link className="volver" to="/">
            ← Volver al inicio
          </Link>
          <h1>
            Garantía real <span>de 1 año</span>
          </h1>
          <p className="lead">
            Llevamos más de 15 años fabricando y jamás hemos tenido una
            garantía cobrada. Igual te la respaldamos: un año desde la fecha
            de compra, con factura electrónica.
          </p>

          <div className="garantia-hero-card">
            <div className="garantia-star">◐</div>
            <div>
              <strong>0 garantías en 15 años.</strong>
              <p>Más de 1.000 clientes de Arica a Punta Arenas. Cuando fabricas tú, respondes tú.</p>
            </div>
          </div>

          <div className="garantia-cols">
            <div className="garantia-col garantia-col--ok">
              <h2>Qué cubre</h2>
              <ul className="lista-cubre">
                {cubre.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="garantia-col garantia-col--no">
              <h2>Qué no cubre</h2>
              <ul className="lista-no-cubre">
                {noCubre.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tip">
            <span className="tip-icon">◑</span>
            <span><strong>Consejo del fabricante:</strong> trabaja en sesiones de
            máximo 30 minutos a temperatura máxima e intercambia puntas. Así
            alargas la vida útil de cada una.</span>
          </div>

          <div className="cta-row">
            <WhatsAppButton message="Hola, necesito hacer valer la garantía de mi pirograbador">
              Hacer valer mi garantía
            </WhatsAppButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
