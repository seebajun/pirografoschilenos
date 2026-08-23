import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import GuaranteePage from "./pages/GuaranteePage.jsx";
import ScrollManager from "./components/ScrollManager/ScrollManager.jsx";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/garantia" element={<GuaranteePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
