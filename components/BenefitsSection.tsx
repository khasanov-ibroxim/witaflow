"use client"
import {motion} from "framer-motion";
import {Sprout, ShieldCheck, Cpu, FlaskConical, HeartPulse, Users} from "lucide-react";

const benefits = [
    {
        icon: Sprout,
        title: "Fransiya va Yevropa ingredientlari",
        description: "Mahsulotlarimiz uchun xomashyo Fransiya va boshqa Yevropa davlatlaridan tanlab olinadi. Bu esa yuqori sifat va barqaror natijani ta’minlaydi.",
        label: "Yevropa xomashyosi",
    },
    {
        icon: ShieldCheck,
        title: "AAA sifat standarti",
        description: "Barcha ingredientlar ko‘p bosqichli tozalash jarayonidan o‘tadi va farmatsevtika sanoatidagi eng yuqori standartlardan biri bo‘lgan AAA sifat kategoriyasiga mos keladi.",
        label: "Yuqori tozalash darajasi",
    },
    {
        icon: Cpu,
        title: "Ilg‘or ishlab chiqarish",
        description: "Mahsulotlar ishlab chiqarishda zamonaviy texnologiyalar qo‘llanadi, bu esa formulalarning samaradorligini oshiradi.",
        label: "Zamonaviy texnologiya",
    },
    {
        icon: FlaskConical,
        title: "Tadqiqotlarga asoslangan formulalar",
        description: "Har bir formula farmakologiya, tibbiyot va nutrisiologiya sohasidagi mutaxassislar tomonidan ilmiy tadqiqotlarga asoslanib ishlab chiqiladi.",
        label: "Ilmiy yondashuv",
    },
    {
        icon: HeartPulse,
        title: "Immunitet va rivojlanish uchun",
        description: "Mahsulotlar immunitetni mustahkamlash, asab tizimini qo‘llab-quvvatlash va organizmning sog‘lom rivojlanishiga yordam berish uchun yaratiladi.",
        label: "Sog‘liqni qo‘llab-quvvatlash",
    },
    {
        icon: Users,
        title: "Ishonchli jamoa",
        description: "Kompaniyamiz jamoasi farmakologiya, tibbiyot va nutrisiologiya mutaxassislaridan iborat bo‘lib, zamonaviy va samarali yechimlarni yaratadi.",
        label: "Mutaxassislar tajribasi",
    },
];

const container = {
    hidden: {},
    show: {transition: {staggerChildren: 0.1}},
};

const item = {
    hidden: {opacity: 0, y: 40},
    show: {opacity: 1, y: 0, transition: {duration: 0.6}},
};

const BenefitsSection = () => {
    return (
        <section

            aria-label="OsteoBalance mahsulotining afzalliklari"
            className="py-24 bg-background relative"
        >
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]"/>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    className="text-center mb-16"
                >
          <span className="text-primary font-body text-sm tracking-widest uppercase">
            Afzalliklar
          </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
                        Nima uchun <span className="text-gradient-gold">Vitaflow Pharm</span>?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body font-light">
                        Vitaflow Pharm — yuqori sifatli biologik faol qo‘shimchalar ishlab chiqarishga ixtisoslashgan
                        zamonaviy farmatsevtik kompaniya. Biz Yevropa xomashyosi, ilmiy yondashuv va zamonaviy
                        texnologiyalarni birlashtirib, bolalar va kattalar salomatligini qo‘llab-quvvatlash uchun
                        samarali mahsulotlar yaratamiz.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true}}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    role="list"
                >
                    {benefits.map((benefit) => (
                        <motion.article
                            key={benefit.title}
                            variants={item}
                            role="listitem"
                            className="group bg-gradient-card border border-gold rounded-xl p-8 hover:shadow-gold transition-all duration-500"
                        >
                            <div
                                className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                                aria-hidden="true"
                            >
                                <benefit.icon className="w-7 h-7 text-primary"/>
                            </div>
                            <span className="text-xs font-body tracking-widest uppercase text-primary/70 mb-2 block">
                {benefit.label}
              </span>
                            <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-muted-foreground font-body font-light leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BenefitsSection;