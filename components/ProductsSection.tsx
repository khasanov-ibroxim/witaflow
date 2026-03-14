import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Link from "next/link";

const ProductsSection = () => {
  return (
    <section id="mahsulotlar" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold text-primary text-sm font-body tracking-widest uppercase mb-4">
            Mahsulotlar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Bizning <span className="text-gradient-gold">mahsulotlarimiz</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-lg">
            Premium sifatli vitaminlar va qo`shimchalar — sog`lom hayot uchun ishonchli hamkor.
          </p>
        </motion.div>

        <div className="space-y-20">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-gold opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                    <div className="relative bg-secondary/30 rounded-3xl border border-border group-hover:border-gold p-10 md:p-14 transition-all duration-500">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                        whileHover={{ rotate: [0, -2, 2, 0] }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body tracking-widest uppercase">
                    {product.volume}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground font-body text-base leading-relaxed">
                    {product.shortDesc}
                  </p>
                  <ul className="space-y-2">
                    {product.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-6 pt-2">
                    <span className="text-3xl font-display font-bold text-gradient-gold">
                      {product.priceFormatted}
                    </span>
                    <Link
                      href={`/mahsulot/${product.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold font-body font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity shadow-gold"
                    >
                      Batafsil
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
