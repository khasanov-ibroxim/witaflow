"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    quantity: "1",
    address: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const lines = [
      `🛒 *Yangi buyurtma*`,
      `👤 Ism: ${formData.name}`,
      `📞 Tel: ${formData.phone}`,
      `🔢 Miqdori: ${formData.quantity}`,
      `📍 Manzil: ${formData.address}`,
      formData.comment ? `💬 Izoh: ${formData.comment}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/998901234567?text=${encodeURIComponent(lines)}`, "_blank");
    setFormData({ name: "", phone: "", quantity: "1", address: "", comment: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="aloqa" className="py-24 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-widest uppercase">Bog`lanish</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Biz bilan <span className="text-gradient-gold">bog`laning</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body font-light">
            Mahsulotlar haqida batafsil ma`lumot olish yoki buyurtma berish uchun biz bilan bog`laning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: Phone, title: "Telefon", info: "+998 90 123 45 67", href: "tel:+998901234567" },
              { icon: Mail, title: "Email", info: "info@vitaflowpharm.uz", href: "mailto:info@vitaflowpharm.uz" },
              { icon: MapPin, title: "Manzil", info: "Toshkent, O'zbekiston", href: "#" },
            ].map((contact) => (
              <a
                key={contact.title}
                href={contact.href}
                className="group bg-gradient-card border border-gold rounded-xl p-6 flex items-center gap-5 hover:shadow-gold transition-all duration-500 block"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <contact.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{contact.title}</h3>
                  <p className="text-muted-foreground font-body text-sm">{contact.info}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Order form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-card border border-gold rounded-2xl p-6 sm:p-8 lg:p-10">
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Buyurtma berish</h3>
              <p className="text-muted-foreground font-body text-sm mb-8">Formni to`ldiring, biz siz bilan bog`lanamiz</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cta-name" className="text-foreground font-body text-sm">
                      Имя <span className="text-destructive">*</span>
                    </Label>
                    <Input id="cta-name" placeholder="Ismingiz" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} maxLength={100} className="bg-background/50 border-border text-foreground h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cta-phone" className="text-foreground font-body text-sm">
                      Тел.номер <span className="text-destructive">*</span>
                    </Label>
                    <Input id="cta-phone" type="tel" placeholder="+998 90 123 45 67" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} maxLength={20} className="bg-background/50 border-border text-foreground h-12" />
                  </div>
                </div>

                {/* Row 2: Quantity + Address */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cta-quantity" className="text-foreground font-body text-sm">Количество</Label>
                    <Input id="cta-quantity" type="number" min="1" max="999" value={formData.quantity} onChange={(e) => handleChange("quantity", e.target.value)} className="bg-background/50 border-border text-foreground h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cta-address" className="text-foreground font-body text-sm">
                      Адрес <span className="text-destructive">*</span>
                    </Label>
                    <Input id="cta-address" placeholder="Manzilingiz" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} maxLength={200} className="bg-background/50 border-border text-foreground h-12" />
                  </div>
                </div>

                {/* Row 3: Comment (full width) */}
                <div className="space-y-2">
                  <Label htmlFor="cta-comment" className="text-foreground font-body text-sm">Комментарий</Label>
                  <Textarea id="cta-comment" placeholder="Qo'shimcha izoh yoki xohishingiz..." value={formData.comment} onChange={(e) => handleChange("comment", e.target.value)} maxLength={500} rows={4} className="bg-background/50 border-border text-foreground resize-none" />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold px-6 py-4 rounded-xl font-body font-semibold text-primary-foreground tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 text-base">
                  <Send className="w-5 h-5" />
                  Yuborish
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
