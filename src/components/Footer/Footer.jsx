import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-left">
          <strong>Pirógrafos Chilenos</strong>
          <span>© 2026 · Fabricación 100% chilena · +1.000 clientes</span>
        </div>
        <div className="footer-links">
          <Link to="/garantia">Garantía</Link>
          <span>·</span>
          <span>MercadoPago · Despacho nacional</span>
        </div>
      </div>
    </footer>
  );
}
