import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import trabajo1 from "../../assets/photos/trabajo_piro01.webp";
import trabajo3 from "../../assets/photos/trabajo_piro03.webp";
import trabajo4 from "../../assets/photos/trabajo_piro04.webp";
import trabajo5 from "../../assets/photos/trabajo_piro05.webp";
import "./ProductsSection.css";

export default function ProductsSection({ product }) {
  return (
    <section id="productos" className="productos-section">
      <div className="wrap">
        <div className="productos-head">
          <div className="productos-head-text">
            <span className="mono productos-kicker">Ficha técnica · Modelo taller · 220V</span>
            <h2 className="productos-title">El pirografo.</h2>
            <p className="productos-lead">
              Sin copias. Potenciómetro real con LED, cable de goma para alta temperatura y puntas Cantal que duran. Trabaja madera, cuero y plumavit.
            </p>
          </div>
          <div className="productos-head-meta mono">
            <span>Entrada 220V/50Hz</span>
            <span>Salida 0–6A</span>
            <span>Fusible 5A</span>
          </div>
        </div>

        <div className="ficha-grid">
          <div className="ficha-media">
            <div className="ficha-mosaic">
              <img src={trabajo1} alt="Trabajo en madera pirograbada" loading="lazy" />
              <img src={trabajo3} alt="Detalle pirograbado cuero" loading="lazy" />
              <img src={trabajo4} alt="Pirograbado en plumavit" loading="lazy" />
              <img src={trabajo5} alt="Veta madera quemada" loading="lazy" />
            </div>
            <div className="ficha-caption mono">Madera · Cuero natural y sintético · Polietileno expandido</div>
          </div>

          <div className="ficha-data">
            <Card {...product} />
            <ul className="specs">
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <div className="ficha-cta">
              <div className="ficha-cta-row">
                <Link to="/comprar" className="btn btn--brasa">Comprar — $95.200</Link>
                <a
                  href="/#garantia"
                  className="btn btn--ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("garantia");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      history.pushState(null, "", "/#garantia");
                    }
                  }}
                >
                  Ver garantía de 1 año
                </a>
              </div>
              <span className="mono ficha-cta-note">Despacho incluido · Factura electrónica · MercadoPago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
