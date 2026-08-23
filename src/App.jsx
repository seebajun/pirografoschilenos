import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import GuaranteePage from "./pages/GuaranteePage.jsx";

function routeFromLocation() {
  return window.location.hash === "#/garantia" ? "garantia" : "home";
}

export default function App() {
  const [route, setRoute] = useState(routeFromLocation);

  useEffect(() => {
    const scrollToAnchor = () => {
      const anchor = window.location.hash.replace(/^#/, "");
      if (!anchor || anchor.startsWith("/")) return;
      document.getElementById(anchor)?.scrollIntoView();
    };

    const onHashChange = () => {
      const next = routeFromLocation();
      setRoute(next);
      if (next === "garantia") {
        window.scrollTo(0, 0);
      } else {
        requestAnimationFrame(scrollToAnchor);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    requestAnimationFrame(scrollToAnchor);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route === "garantia" ? <GuaranteePage /> : <HomePage />;
}
