import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";



const Index = () => {
  return (
      <>
        <Navbar />
        <main>
          <HeroSection />
          <ProductsSection />
          <BenefitsSection />
          <AboutSection />
          <CTASection />
        </main>
        <Footer />
      </>
  );
};

export default Index;
