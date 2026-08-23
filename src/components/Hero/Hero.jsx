import "./Hero.css";

export default function Hero({ title, subtitle, ctaText, ctaHref }) {
  return (
    <div className="hero">
      <div className="wrap">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a className="btn" href={ctaHref}>
          {ctaText}
        </a>
      </div>
    </div>
  );
}
