import { Link } from "react-router-dom";
import "./GuaranteeSection.css";

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

export default function GuaranteeSection() {
  return (
    <section id="garantia" className="garantia-sec">
      <div className="wrap">
        <div className="garantia-sec-head">
          <span className="mono garantia-kicker">Garantía real · 12 meses con factura</span>
          <h2 className="garantia-sec-title">
            15 años, <span>0 garantías cobradas.</span>
          </h2>
          <p className="garantia-sec-lead">
            Fabricamos nosotros, respondemos nosotros. Un año desde la fecha de
            compra con factura electrónica. Más de 1.000 clientes de Arica a
            Punta Arenas.
          </p>
        </div>

        <div className="garantia-sec-cols">
          <div className="garantia-card garantia-card--ok">
            <h3 className="mono">Qué cubre</h3>
            <ul>
              {cubre.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="garantia-card garantia-card--no">
            <h3 className="mono">Qué no cubre</h3>
            <ul>
              {noCubre.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="garantia-tip">
          <span className="tip-icon">◑</span>
          <span>
            <strong>Consejo del fabricante:</strong> trabaja en sesiones de
            máximo 30 minutos a temperatura máxima e intercambia puntas. Así
            alargas la vida útil de cada una.
          </span>
        </div>

        <div className="garantia-cta">
          <Link to="/comprar" className="btn btn--brasa">
            Comprar ahora
          </Link>
          <span className="mono garantia-cta-note">
            Despacho incluido · Factura electrónica · Paga con MercadoPago
          </span>
        </div>
      </div>
    </section>
  );
}
