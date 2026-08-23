import { Link } from "react-router-dom";

export default function Button({
  to,
  href,
  target,
  rel,
  className = "btn",
  children,
  ...rest
}) {
  if (to) {
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
