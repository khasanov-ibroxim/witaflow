"use client"
import {motion} from "framer-motion";
import logoImage from "@/assets/logoRemoved.png";
import {CheckCircle2} from "lucide-react";
import Image from "next/image";

const features = [
    "Sog'lom rivojlanishga hissa",
    "Doimiy quvvat manbai",
    "Har kuni tanangizga g'amxo'rlik",
    "Shakar va GMO siz",
    "Bo'yoqsiz va sun'iy qo'shimchalarsiz",
];

const AboutSection = () => {
    return (
        <section
            id="haqida"
            aria-label="Vitaflow Pharm kompaniyasi haqida"
            className="py-24 bg-secondary relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"/>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-3 gap-5 items-start">
                    {/* Logo */}
                    <motion.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.7}}>
                         <span className="text-primary font-body text-sm tracking-widest uppercase">
              Kompaniya haqida
            </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-4 mb-6 text-foreground">
                            <span className="text-gradient-gold">Vitaflow Pharm</span> — Premium Concept
                        </h2>
                        <p className="text-muted-foreground text-lg font-body font-light leading-relaxed mb-8">
                            Vitaflow Pharm — biologik faol qo‘shimchalar ishlab chiqish va ishlab chiqarishga
                            ixtisoslashgan zamonaviy farmatsevtik kompaniya. Biz mahsulotlarimizni yaratishda ilmiy
                            yondashuv, yuqori sifatli xomashyo va zamonaviy ishlab chiqarish texnologiyalarini
                            birlashtiramiz.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        className="flex justify-center"
                    >
                        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                            <div
                                className="absolute inset-0 rounded-3xl"/>
                            <Image
                                src={logoImage}
                                alt="Vitaflow Pharm — VF Premium Concept logotipi"
                                className="relative z-10 w-full h-full object-contain p-8"
                                priority={false}
                            />
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.7}}
                    >

                        <p className="text-muted-foreground text-lg font-body font-light leading-relaxed mb-8">Har bir
                            formula farmakologiya, tibbiyot va nutrisiologiya sohasidagi mutaxassislar tomonidan ishlab
                            chiqiladi. Mahsulotlarimiz uchun tanlangan ingredientlar Yevropa sifat standartlariga mos
                            keladi va ko‘p bosqichli tozalash jarayonidan o‘tadi. Bu esa mahsulotlarning xavfsizligi,
                            yuqori biofoydalanishi va samaradorligini ta’minlaydi.</p>
                        <p className="text-muted-foreground text-lg font-body font-light leading-relaxed mb-8">Vitaflow
                            Pharm kompaniyasining asosiy maqsadi — bolalar va kattalar salomatligini qo‘llab-quvvatlash
                            uchun innovatsion va ishonchli mahsulotlar yaratish. Biz immunitetni mustahkamlash, organizm
                            rivojlanishini qo‘llab-quvvatlash va hayot sifatini yaxshilashga qaratilgan zamonaviy
                            yechimlarni taklif etamiz.</p>

                        {/*<ul className="space-y-4" role="list">*/}
                        {/*    {features.map((feature) => (*/}
                        {/*        <li key={feature} className="flex items-center gap-3">*/}
                        {/*            <CheckCircle2*/}
                        {/*                className="w-5 h-5 text-primary flex-shrink-0"*/}
                        {/*                aria-hidden="true"*/}
                        {/*            />*/}
                        {/*            <span className="text-foreground font-body">{feature}</span>*/}
                        {/*        </li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;