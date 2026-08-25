import Button from "../Button/Button.jsx";
import pirografoImg from "../../assets/photos/pirografo_01.webp";
import "./Hero.css";

export default function Hero({ subtitle, ctaText, ctaTo }) {
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Taller propio · Desde 2010 · Chile · Caja plateada</span>
          <h1 className="hero-title">
            <span className="hero-line">Pirograbador</span>
            <span className="hero-line hero-line--accent">hecho en Chile</span>
          </h1>
          <svg className="burn-divider hero-burn" viewBox="0 0 420 14" preserveAspectRatio="none" aria-hidden="true">
            <path d="M2 8 C 40 2, 80 12, 120 7 C 160 2, 190 10, 230 6 C 270 2, 310 11, 350 5 C 380 2, 400 8, 418 7" />
          </svg>
          <p className="hero-subtitle">{subtitle}</p>
          <div className="hero-ctas">
            <Button to={ctaTo}>{ctaText} →</Button>
            <div className="hero-price">
              <span className="mono">Precio directo fábrica</span>
              <strong>$95.200</strong>
              <span className="hero-price-note">Caja plateada · LED naranjo · 6 puntas + despacho</span>
            </div>
          </div>

          <ul className="hero-bullets" aria-label="Características principales">
            <li>Caja plateada · LED naranjo</li>
            <li>220V · 0–6A · Potencia regulable</li>
            <li>Cable goma alta temperatura</li>
            <li>Factura + despacho nacional</li>
          </ul>
        </div>

        <figure className="hero-visual">
          <div className="hero-img-wrap">
            <img src={pirografoImg} alt="Pirograbador profesional caja plateada sobre mesa de taller" width="640" height="640" loading="eager" />
            <div className="hero-img-glow" aria-hidden="true" />
          </div>
          <figcaption className="hero-badge">
            <span className="hero-badge-kicker mono">+1.000 clientes</span>
            <span className="hero-badge-main">De Arica a<br />Punta Arenas</span>
            <span className="hero-badge-dot" aria-hidden="true" />
          </figcaption>
          <div className="hero-visual-caption mono">Mango certificado · 6 puntas Cantal 1,0 mm · Fusible 5A</div>
        </figure>
      </div>
    </div>
  );
}
