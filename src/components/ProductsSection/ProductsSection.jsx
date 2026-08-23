import Card from "../Card/Card.jsx";
import "./ProductsSection.css";

export default function ProductsSection({ product }) {
  return (
    <section id="productos" className="band">
      <div className="wrap">
        <h2>El pirografo</h2>
        <ul className="productos">
          <Card {...product} />
        </ul>
        <ul className="specs">
          {product.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
