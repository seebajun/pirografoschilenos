import { Link, useNavigate } from "react-router-dom";

export default function Button({
  to,
  href,
  target,
  rel,
  className = "btn",
  children,
  ...rest
}) {
  const navigate = useNavigate();

  if (to) {
    // Hash links (/#productos, /#garantia) must work on every click
    // React Router won't re-navigate if hash is already active, so we handle it manually
    if (to.includes("#")) {
      const handleHashClick = (e) => {
        if (rest.onClick) rest.onClick(e);
        const [path, hash] = to.split("#");
        const id = hash;
        // Si no estamos en "/", primero navegar al home y luego scrollear
        const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
        const targetPath = (path.replace(/\/+$/, "") || "/");
        if (currentPath !== targetPath) {
          e.preventDefault();
          navigate(to);
          // scroll will be handled by ScrollManager after navigation
          return;
        }
        // Mismo path: scrollear sin recargar ruta
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, "", to);
        }
      };
      return (
        <a href={to} className={className} onClick={handleHashClick} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target={target} rel={rel} className={className} {...rest}>
      {children}
    </a>
  );
}
