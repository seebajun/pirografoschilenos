import HomePage from "./pages/HomePage.jsx";
import GuaranteePage from "./pages/GuaranteePage.jsx";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  const isGarantia =
    pathname.endsWith("/garantia") || window.location.hash === "#/garantia";
  return isGarantia ? <GuaranteePage /> : <HomePage />;
}
