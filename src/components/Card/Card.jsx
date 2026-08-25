import "./Card.css";

export default function Card({ nombre, desc, precio }) {
  return (
    <div className="card">
      <div className="card-top">
        <span className="mono card-kicker">Modelo único · Stock taller</span>
        <h3 className="card-nombre">{nombre}</h3>
        <p className="card-desc">{desc}</p>
      </div>
      <div className="card-precio-box">
        <span className="mono card-precio-label">Venta directa fábrica</span>
        <span className="card-precio">{precio}</span>
        <span className="card-precio-sub">Factura electrónica · Despacho incluido</span>
      </div>
    </div>
  );
}
