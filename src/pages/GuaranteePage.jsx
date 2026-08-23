import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { whatsappLink } from "../data/contact.js";
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
          <a className="volver" href="/">
            ← Volver al inicio
          </a>
          <h1>Garantía real de 1 año</h1>
          <p className="lead">
            Llevamos más de 15 años fabricando y jamás hemos tenido una
            garantía cobrada. Igual te la respaldamos: un año desde la fecha
            de compra, con factura electrónica.
          </p>

          <div className="garantia-cols">
            <div>
              <h2>Qué cubre</h2>
              <ul className="lista-cubre">
                {cubre.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Qué no cubre</h2>
              <ul className="lista-no-cubre">
                {noCubre.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tip">
            <strong>Consejo del fabricante:</strong> trabaja en sesiones de
            máximo 30 minutos a temperatura máxima e intercambia puntas. Así
            alargas la vida útil de cada una.
          </div>

          <div className="cta-row">
            <a
              className="btn"
              target="_blank"
              rel="noreferrer"
              href={whatsappLink(
                "Hola, necesito hacer valer la garantía de mi pirograbador"
              )}
            >
              Hacer valer mi garantía
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
