import "./Card.css";

export default function Card({ nombre, desc, precio }) {
  return (
    <li className="card">
      <div>
        <div className="card-nombre">{nombre}</div>
        <div className="card-desc">{desc}</div>
      </div>
      <span className="card-precio">{precio}</span>
    </li>
  );
}
