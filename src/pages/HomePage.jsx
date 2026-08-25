import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import ProductsSection from "../components/ProductsSection/ProductsSection.jsx";
import GuaranteeSection from "../components/GuaranteeSection/GuaranteeSection.jsx";
import ContactSection from "../components/ContactSection/ContactSection.jsx";
import Footer from "../components/Footer/Footer.jsx";
import product from "../data/products.js";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero
          subtitle="15 años fabricando la herramienta que usan artesanos de Arica a Punta Arenas. Madera, cuero y plumavit, con potencia regulable."
          ctaText="Ver el producto"
          ctaTo="/#productos"
        />
        <ProductsSection product={product} />
        <GuaranteeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
