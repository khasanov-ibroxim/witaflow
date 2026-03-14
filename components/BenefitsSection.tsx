import { motion } from "framer-motion";
import { Shield, Bone, Zap, Heart, Award, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Bone,
    title: "Kaltsiy va D3",
    description: "Suyaklar mustahkamligi va sog'lom o'sish uchun asosiy tarkibiy qismlar.",
    label: "Suyaklar uchun",
  },
  {
    icon: Zap,
    title: "Magniy va C vitamini",
    description: "Tana energiyasini oshiradi va mushaklar faoliyatini qo'llab-quvvatlaydi.",
    label: "Energiya uchun",
  },
  {
    icon: Shield,
    title: "Sink (Zn)",
    description: "Immunitet tizimini kuchaytiradi va organizmni himoya qiladi.",
    label: "Immunitet uchun",
  },
  {
    icon: Heart,
    title: "So'rilishi yuqori",
    description: "Maxsus formula tufayli barcha vitaminlar tez va samarali so'riladi.",
    label: "Samaradorlik",
  },
  {
    icon: Award,
    title: "Sifat kafolati",
    description: "Har bir shishada e'tibor va sifat mujassam. GMO va shakar siz.",
    label: "Sifat",
  },
  {
    icon: Sparkles,
    title: "Mutanosib formula",
    description: "Barcha komponentlar o'zaro uyg'unlikda — maksimal natija uchun.",
    label: "Formula",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BenefitsSection = () => {
  return (
    <section id="mahsulot" className="py-24 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-widest uppercase">Afzalliklar</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Nima uchun <span className="text-gradient-gold">OsteoBalance</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body font-light">
            Bu oddiy BAD emas — bu ota-onalik mas'uliyatini yengillashtiruvchi vosita.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit) => (
            <motion.article
              key={benefit.title}
              variants={item}
              className="group bg-gradient-card border border-gold rounded-xl p-8 hover:shadow-gold transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs font-body tracking-widest uppercase text-primary/70 mb-2 block">
                {benefit.label}
              </span>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground font-body font-light leading-relaxed">{benefit.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
