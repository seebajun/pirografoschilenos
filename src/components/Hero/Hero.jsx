import Button from "../Button/Button.jsx";
import "./Hero.css";

export default function Hero({ title, subtitle, ctaText, ctaTo }) {
  return (
    <div className="hero">
      <div className="wrap">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Button to={ctaTo}>{ctaText}</Button>
      </div>
    </div>
  );
}
