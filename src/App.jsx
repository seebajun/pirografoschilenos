import HomePage from "./pages/HomePage.jsx";
import GuaranteePage from "./pages/GuaranteePage.jsx";

export default function App() {
  const path = window.location.pathname;
  return path.startsWith("/garantia") ? <GuaranteePage /> : <HomePage />;
}
