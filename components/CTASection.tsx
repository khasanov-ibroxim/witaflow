"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// ─── Contact cards ────────────────────────────────────────────────────────────
const contacts = [
  { icon: Phone,  title: "Telefon", info: "+998 90 123 45 67",     href: "tel:+998901234567" },
  { icon: Mail,   title: "Email",   info: "info@vitaflowpharm.uz", href: "mailto:info@vitaflowpharm.uz" },
  { icon: MapPin, title: "Manzil",  info: "Toshkent, O'zbekiston", href: "https://maps.google.com/?q=Toshkent,+O%27zbekiston" },
];

// ─── Social links ─────────────────────────────────────────────────────────────
const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/vitaflowpharm",
    color: "hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    iconColor: "group-hover:text-pink-400",
    icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>
        </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/vitaflowpharm",
    color: "hover:border-sky-500/60 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]",
    iconColor: "group-hover:text-sky-400",
    icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zm5.893 7.216-2.019 9.52c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.022 13.6 5.07 12.7c-.656-.205-.67-.656.138-.971l10.64-4.105c.546-.196 1.023.133.99.592z"/>
        </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/vitaflowpharm",
    color: "hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    iconColor: "group-hover:text-blue-400",
    icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.254h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
    ),
  },
];

// ─── Validation helpers ───────────────────────────────────────────────────────
const PHONE_PREFIX     = "+998 ";
const PHONE_MAX_LENGTH = 19;

function formatLocalDigits(digits: string): string {
  const d = digits.slice(0, 9);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");
}
function extractLocalDigits(value: string): string {
  const without = value.startsWith(PHONE_PREFIX) ? value.slice(PHONE_PREFIX.length) : value;
  return without.replace(/\D/g, "").slice(0, 9);
}
function sanitizePhone(value: string): string {
  if (!value.startsWith(PHONE_PREFIX)) {
    const digits = value.replace(/\D/g, "");
    const local  = digits.startsWith("998") ? digits.slice(3) : digits;
    return PHONE_PREFIX + formatLocalDigits(local);
  }
  return PHONE_PREFIX + formatLocalDigits(extractLocalDigits(value));
}

const NAME_REGEX      = /^[a-zA-ZА-Яа-яЁёÀ-ÖØ-öø-ÿ''\-\s]{2,50}$/u;
const VALID_OPERATORS = ["90","91","93","94","95","97","98","99","20","33","50","55","77","88"];

function sanitizeName(v: string) {
  return v.replace(/[^a-zA-ZА-Яа-яЁёÀ-ÖØ-öø-ÿ''\-\s]/gu, "").slice(0, 50);
}

type FieldErrors = { name: string; phone: string; quantity: string; address: string; comment: string };
const EMPTY_ERRORS: FieldErrors = { name: "", phone: "", quantity: "", address: "", comment: "" };
const EMPTY_FORM = { name: "", phone: PHONE_PREFIX, quantity: "1", address: "", comment: "" };

// ─── Component ────────────────────────────────────────────────────────────────
const CTASection = () => {
  const [form,            setForm]            = useState(EMPTY_FORM);
  const [errors,          setErrors]          = useState<FieldErrors>(EMPTY_ERRORS);
  const [touched,         setTouched]         = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status,          setStatus]          = useState<"idle"|"loading"|"success"|"error">("idle");
  const [apiError,        setApiError]        = useState("");

  const validateField = useCallback((field: string, value: string): string => {
    switch (field) {
      case "name": {
        const v = value.trim();
        if (!v)                  return "Ism kiritilmadi.";
        if (v.length < 2)        return "Ism kamida 2 ta harfdan iborat bo'lishi kerak.";
        if (!NAME_REGEX.test(v)) return "Ismda faqat harf, tire va apostrof bo'lishi mumkin.";
        return "";
      }
      case "phone": {
        const local = extractLocalDigits(value);
        if (local.length === 0) return "Telefon raqam kiritilmadi.";
        if (local.length < 9)   return `Yana ${9 - local.length} ta raqam kiriting.`;
        if (!VALID_OPERATORS.includes(local.slice(0, 2)))
          return "Noto'g'ri operator kodi. Masalan: 90, 91, 93, 95, 97, 99...";
        return "";
      }
      case "quantity": {
        const n = parseInt(value, 10);
        if (isNaN(n) || value.trim() === "") return "Miqdor kiritilmadi.";
        if (n < 1)   return "Miqdor 1 dan kam bo'lmasin.";
        if (n > 999) return "Miqdor 999 dan oshmasin.";
        return "";
      }
      case "address": {
        const v = value.trim();
        if (!v)           return "Manzil kiritilmadi.";
        if (v.length < 5)  return "Manzil juda qisqa (kamida 5 belgi).";
        if (v.length > 200) return "Manzil juda uzun (200 belgigacha).";
        return "";
      }
      case "comment":
        return value.length > 500 ? "Izoh 500 belgidan oshmasin." : "";
      default:
        return "";
    }
  }, []);

  const handleChange = (field: string, raw: string) => {
    let value = raw;
    if (field === "name")  value = sanitizeName(raw);
    if (field === "phone") value = sanitizePhone(raw);
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field] || submitAttempted)
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, form[field as keyof typeof form]) }));
  };

  const handlePhoneBlur = () => {
    handleBlur("phone");
    setForm(prev => ({ ...prev, phone: sanitizePhone(prev.phone) }));
  };

  const validateAll = (): boolean => {
    const next: FieldErrors = {
      name:     validateField("name",     form.name),
      phone:    validateField("phone",    form.phone),
      quantity: validateField("quantity", form.quantity),
      address:  validateField("address",  form.address),
      comment:  validateField("comment",  form.comment),
    };
    setErrors(next);
    return Object.values(next).every(e => e === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({ name: true, phone: true, quantity: true, address: true, comment: true });
    if (!validateAll()) return;

    setApiError("");
    setStatus("loading");

    const text = [
      `🛒 <b>Yangi buyurtma</b>`,
      `👤 <b>Ism:</b> ${form.name.trim()}`,
      `📞 <b>Tel:</b> ${sanitizePhone(form.phone)}`,
      `🔢 <b>Miqdori:</b> ${form.quantity}`,
      `📍 <b>Manzil:</b> ${form.address.trim()}`,
      form.comment.trim() ? `💬 <b>Izoh:</b> ${form.comment.trim()}` : "",
    ].filter(Boolean).join("\n");

    try {
      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId   = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
      if (!botToken || !chatId) throw new Error("config");
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });
      if (!res.ok) throw new Error("api");
      setStatus("success");
      setForm(EMPTY_FORM);
      setErrors(EMPTY_ERRORS);
      setTouched({});
      setSubmitAttempted(false);
    } catch (err) {
      setStatus("error");
      setApiError(
          err instanceof Error && err.message === "config"
              ? "Konfiguratsiya xatosi. Administrator bilan bog'laning."
              : "Server bilan bog'lanishda xatolik. Qayta urinib ko'ring."
      );
    }
  };

  const hasErrors = Object.values(errors).some(e => e !== "");

  const fields = [
    {
      id: "name", label: "Ismingiz", placeholder: "Masalan: Sardor Karimov",
      type: "text", required: true, autoComplete: "name",
      inputMode: undefined as React.HTMLAttributes<HTMLInputElement>["inputMode"],
      hint: "Kamida 2 ta harf, faqat harflar", maxLen: 50,
    },
    {
      id: "phone", label: "Tel. raqam", placeholder: "+998 90 123 45 67",
      type: "tel", required: true, autoComplete: "tel",
      inputMode: "tel" as React.HTMLAttributes<HTMLInputElement>["inputMode"],
      hint: "Operator kodi va 7 ta raqam kiriting", maxLen: PHONE_MAX_LENGTH,
    },
  ] as const;

  return (
      <section
          id="aloqa"
          aria-label="Vitaflow Pharm bilan bog'lanish va buyurtma berish"
          className="py-24 bg-background relative"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
          >
          <span className="text-primary font-body text-sm tracking-widest uppercase">
            Bog&apos;lanish
          </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
              Biz bilan <span className="text-gradient-gold">bog&apos;laning</span>
            </h2>
            <p className="text-muted-foreground text-lg font-body font-light">
              Mahsulotlar haqida batafsil ma&apos;lumot olish yoki buyurtma berish uchun
              biz bilan bog&apos;laning.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">

            {/* ── Left: contacts + socials ── */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
              {/* Contact cards */}
              {contacts.map((contact) => (
                  <a
                      key={contact.title}
                      href={contact.href}
                      rel="noopener noreferrer"
                      className="group bg-gradient-card border border-gold rounded-xl p-6 flex items-center gap-5 hover:shadow-gold transition-all duration-500"
                      aria-label={`${contact.title}: ${contact.info}`}
                  >
                    <div
                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                        aria-hidden="true"
                    >
                      <contact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{contact.title}</h3>
                      <p className="text-muted-foreground font-body text-sm">{contact.info}</p>
                    </div>
                  </a>
              ))}

              {/* Social links */}
              <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="pt-2"
              >
                <p className="text-muted-foreground font-body text-xs tracking-widest uppercase mb-4">
                  Ijtimoiy tarmoqlar
                </p>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                      <a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          className={[
                            "group flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl",
                            "bg-gradient-card border border-gold/40 transition-all duration-300",
                            s.color,
                          ].join(" ")}
                      >
                    <span className={`text-muted-foreground transition-colors duration-300 ${s.iconColor}`}>
                      {s.icon}
                    </span>
                        <span className={`font-body text-sm font-medium text-muted-foreground transition-colors duration-300 ${s.iconColor}`}>
                      {s.name}
                    </span>
                      </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: Order form ── */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
              <div className="bg-gradient-card border border-gold rounded-2xl p-6 sm:p-8 lg:p-10">
                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  Buyurtma berish
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-7">
                  Formni to&apos;ldiring, biz siz bilan bog&apos;lanamiz
                </p>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                      <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-4 py-10 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-display font-bold text-xl text-foreground">
                          Buyurtma qabul qilindi!
                        </h4>
                        <p className="text-muted-foreground font-body text-sm">
                          Tez orada siz bilan bog&apos;lanamiz.
                        </p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-1 px-6 py-2.5 rounded-xl bg-gradient-gold font-body font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          Yangi buyurtma
                        </button>
                      </motion.div>
                  ) : (
                      <motion.form
                          key="form"
                          onSubmit={handleSubmit}
                          className="space-y-5"
                          noValidate
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                      >
                        {/* Row 1: Name + Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {fields.map((field) => {
                            const err     = errors[field.id];
                            const isDirty = touched[field.id] || submitAttempted;
                            const isError = isDirty && !!err;
                            const isOk    =
                                isDirty && !err &&
                                (field.id === "phone"
                                    ? extractLocalDigits(form.phone).length === 9
                                    : form.name.trim().length >= 2);

                            return (
                                <div key={field.id} className="space-y-1">
                                  <Label htmlFor={`cta-${field.id}`} className="text-foreground font-body text-sm flex items-center gap-1">
                                    {field.label}
                                    {field.required && <span className="text-destructive" aria-hidden="true">*</span>}
                                  </Label>
                                  <div className="relative">
                                    <Input
                                        id={`cta-${field.id}`}
                                        type={field.type}
                                        inputMode={field.inputMode}
                                        placeholder={field.placeholder}
                                        value={form[field.id]}
                                        autoComplete={field.autoComplete}
                                        maxLength={field.maxLen}
                                        disabled={status === "loading"}
                                        aria-invalid={isError}
                                        aria-describedby={isError ? `cta-err-${field.id}` : `cta-hint-${field.id}`}
                                        onChange={(e) => {
                                          if (field.id === "phone" && !e.target.value.startsWith(PHONE_PREFIX)) {
                                            handleChange("phone", sanitizePhone(e.target.value));
                                            return;
                                          }
                                          handleChange(field.id, e.target.value);
                                        }}
                                        onBlur={field.id === "phone" ? handlePhoneBlur : () => handleBlur(field.id)}
                                        onKeyDown={(e) => {
                                          if (field.id === "phone") {
                                            const el   = e.currentTarget;
                                            const sel  = el.selectionStart ?? 0;
                                            const pLen = PHONE_PREFIX.length;
                                            if ((e.key === "Backspace" && sel <= pLen) || (e.key === "Delete" && sel < pLen))
                                              e.preventDefault();
                                          }
                                        }}
                                        onClick={(e) => {
                                          if (field.id === "phone") {
                                            const el = e.currentTarget;
                                            if ((el.selectionStart ?? 0) < PHONE_PREFIX.length)
                                              el.setSelectionRange(PHONE_PREFIX.length, PHONE_PREFIX.length);
                                          }
                                        }}
                                        className={[
                                          "bg-background/50 text-foreground h-12 pr-9 transition-colors",
                                          isError ? "border-destructive focus-visible:ring-destructive/50" : "",
                                          isOk    ? "border-primary/60" : "border-border",
                                        ].join(" ")}
                                    />
                                    {isDirty && form[field.id] !== PHONE_PREFIX && form[field.id] !== "" && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  {isError
                                      ? <AlertCircle  className="w-4 h-4 text-destructive" aria-hidden="true" />
                                      : isOk
                                          ? <CheckCircle2 className="w-4 h-4 text-primary"     aria-hidden="true" />
                                          : null}
                                </span>
                                    )}
                                  </div>
                                  <AnimatePresence mode="wait">
                                    {isError ? (
                                        <motion.p
                                            key="err"
                                            id={`cta-err-${field.id}`}
                                            role="alert"
                                            initial={{ opacity: 0, y: -4, height: 0 }}
                                            animate={{ opacity: 1, y: 0,  height: "auto" }}
                                            exit={{   opacity: 0,          height: 0 }}
                                            transition={{ duration: 0.17 }}
                                            className="text-destructive text-xs font-body flex items-center gap-1 overflow-hidden"
                                        >
                                          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                                          {err}
                                        </motion.p>
                                    ) : (
                                        <p key="hint" id={`cta-hint-${field.id}`} className="text-muted-foreground text-xs font-body">
                                          {field.hint}
                                        </p>
                                    )}
                                  </AnimatePresence>
                                </div>
                            );
                          })}
                        </div>

                        {/* Row 2: Quantity + Address */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Quantity */}
                          <div className="space-y-1">
                            <Label htmlFor="cta-quantity" className="text-foreground font-body text-sm">Miqdori</Label>
                            <Input
                                id="cta-quantity"
                                type="number"
                                inputMode="numeric"
                                min={1} max={999}
                                value={form.quantity}
                                disabled={status === "loading"}
                                onChange={(e) => handleChange("quantity", e.target.value)}
                                onBlur={() => handleBlur("quantity")}
                                aria-invalid={!!(touched.quantity && errors.quantity)}
                                className={[
                                  "bg-background/50 text-foreground h-12 transition-colors",
                                  touched.quantity && errors.quantity ? "border-destructive" : "border-border",
                                ].join(" ")}
                            />
                            <AnimatePresence mode="wait">
                              {touched.quantity && errors.quantity ? (
                                  <motion.p key="err" role="alert"
                                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                            className="text-destructive text-xs font-body flex items-center gap-1"
                                  >
                                    <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.quantity}
                                  </motion.p>
                              ) : (
                                  <p key="hint" className="text-muted-foreground text-xs font-body">1 dan 999 gacha</p>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Address */}
                          <div className="space-y-1">
                            <Label htmlFor="cta-address" className="text-foreground font-body text-sm flex items-center gap-1">
                              Manzil <span className="text-destructive" aria-hidden="true">*</span>
                            </Label>
                            <div className="relative">
                              <Input
                                  id="cta-address"
                                  placeholder="Masalan: Toshkent, Chilonzor"
                                  value={form.address}
                                  autoComplete="street-address"
                                  maxLength={200}
                                  disabled={status === "loading"}
                                  onChange={(e) => handleChange("address", e.target.value)}
                                  onBlur={() => handleBlur("address")}
                                  aria-invalid={!!(touched.address || submitAttempted) && !!errors.address}
                                  className={[
                                    "bg-background/50 text-foreground h-12 pr-9 transition-colors",
                                    (touched.address || submitAttempted) && errors.address        ? "border-destructive" : "",
                                    (touched.address || submitAttempted) && !errors.address && form.address.trim().length >= 5 ? "border-primary/60" : "border-border",
                                  ].join(" ")}
                              />
                              {(touched.address || submitAttempted) && form.address.trim() !== "" && (
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              {errors.address
                                  ? <AlertCircle  className="w-4 h-4 text-destructive" aria-hidden="true" />
                                  : <CheckCircle2 className="w-4 h-4 text-primary"     aria-hidden="true" />}
                            </span>
                              )}
                            </div>
                            <AnimatePresence mode="wait">
                              {(touched.address || submitAttempted) && errors.address ? (
                                  <motion.p key="err" role="alert"
                                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                            className="text-destructive text-xs font-body flex items-center gap-1"
                                  >
                                    <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.address}
                                  </motion.p>
                              ) : (
                                  <p key="hint" className="text-muted-foreground text-xs font-body">Kamida 5 ta belgi</p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Row 3: Comment */}
                        <div className="space-y-1">
                          <Label htmlFor="cta-comment" className="text-foreground font-body text-sm">Izoh</Label>
                          <Textarea
                              id="cta-comment"
                              placeholder="Qo'shimcha izoh yoki xohishingiz..."
                              value={form.comment}
                              onChange={(e) => handleChange("comment", e.target.value)}
                              onBlur={() => handleBlur("comment")}
                              maxLength={500}
                              rows={4}
                              disabled={status === "loading"}
                              aria-invalid={!!(touched.comment && errors.comment)}
                              className={[
                                "bg-background/50 text-foreground resize-none transition-colors",
                                touched.comment && errors.comment ? "border-destructive" : "border-border",
                              ].join(" ")}
                          />
                          <div className="flex items-center justify-between">
                            {touched.comment && errors.comment ? (
                                <p className="text-destructive text-xs font-body flex items-center gap-1" role="alert">
                                  <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.comment}
                                </p>
                            ) : <span />}
                            <p className={`text-xs font-body ml-auto ${form.comment.length > 450 ? "text-destructive" : "text-muted-foreground"}`}>
                              {form.comment.length}/500
                            </p>
                          </div>
                        </div>

                        {/* API error */}
                        {status === "error" && apiError && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30"
                                role="alert"
                            >
                              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <p className="text-destructive text-sm font-body">{apiError}</p>
                            </motion.div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={status === "loading" || (submitAttempted && hasErrors)}
                            aria-label="Buyurtmani Telegram orqali yuborish"
                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold px-6 py-4 rounded-xl font-body font-semibold text-primary-foreground tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 text-base cursor-pointer"
                        >
                          {status === "loading" ? (
                              <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />Yuborilmoqda...</>
                          ) : (
                              <><Send className="w-5 h-5" aria-hidden="true" />Yuborish</>
                          )}
                        </button>
                      </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
};

export default CTASection;