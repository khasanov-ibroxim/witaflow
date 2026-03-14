"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import productImage from "@/assets/ob_product.png";

const HeroSection = () => {
  return (
      <section
          className="relative min-h-screen flex items-center overflow-hidden bg-gradient-emerald"
          aria-label="OsteoBalance — suyaklar va immunitet uchun premium vitamin suspenziyasi"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        </div>

        <div className="container mt-20 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
            >
              <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full border border-gold text-primary text-sm font-body tracking-widest uppercase mb-6"
              >
                Premium Concept
              </motion.span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6">
                <span className="text-foreground">Sog&apos;lom</span>{" "}
                <span className="text-gradient-gold">rivojlanish</span>
                <br />
                <span className="text-foreground">uchun kuch</span>
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-8 font-body font-light leading-relaxed">
                Kaltsiy, Magniy, D3, Sink va C vitamini — o&apos;zaro uyg&apos;unlikda bo&apos;lsa,
                tanada kuchli immunitet va suyaklar poydevori yaratiladi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                    href="#mahsulot"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-gold px-8 py-4 rounded-lg font-body font-semibold text-primary-foreground tracking-wide text-center"
                >
                  Batafsil ma&apos;lumot
                </motion.a>
                <motion.a
                    href="#aloqa"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-gold px-8 py-4 rounded-lg font-body font-semibold text-primary tracking-wide text-center"
                >
                  Bog&apos;lanish
                </motion.a>
              </div>
            </motion.div>

            {/* Product Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 glow-gold rounded-full scale-75" aria-hidden="true" />
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                >
                  <Image
                      src={productImage}
                      alt="OsteoBalance — Kaltsiy, Magniy, D3, Sink va C vitamini suspenziyasi 100ml"
                      className="w-64 sm:w-80 lg:w-96 drop-shadow-2xl"
                      priority
                      quality={90}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;