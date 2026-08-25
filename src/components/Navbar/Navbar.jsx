import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import "./Navbar.css";

const links = [
  { label: "Producto", to: "/#productos" },
  { label: "Garantía", to: "/#garantia" },
  { label: "Contacto", to: "/#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 30 : y > 90));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="nav-spacer" aria-hidden="true" />
      <header className={scrolled ? "scrolled" : undefined}>
        <div className="wrap">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo de Pirógrafos Chilenos" />
            <span className="logo-text">
              Pirógrafos Chilenos
              <small>Hecho en Chile · 2010</small>
            </span>
          </Link>
          <nav>
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
            <Link className="nav-garantia" to="/comprar">
              Comprar — $95.200
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
