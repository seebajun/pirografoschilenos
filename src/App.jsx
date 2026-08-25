import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import GuaranteePage from "./pages/GuaranteePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ScrollManager from "./components/ScrollManager/ScrollManager.jsx";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comprar" element={<CheckoutPage />} />
        <Route path="/garantia" element={<GuaranteePage />} />
        <Route path="/garantia/*" element={<Navigate to="/#garantia" replace />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
