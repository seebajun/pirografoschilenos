import { useEffect, useState } from "react";
import logo from "../../assets/logo.webp";
import "./Navbar.css";

const links = [
  { label: "Producto", href: "/#productos" },
  { label: "Contacto", href: "/#contacto" },
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
          <span className="logo">
            <img src={logo} alt="Logo de Pirógrafos Chilenos" />
            Pirógrafos Chilenos
          </span>
          <nav>
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a className="nav-garantia" href="/garantia">
              Garantía
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
