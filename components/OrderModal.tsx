"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName?: string;
}

type Status = "idle" | "loading" | "success" | "error";

// ─── Validation rules ───────────────────────────────────────────────────────

/**
 * Ism:
 *  - Kamida 2 ta harf
 *  - Faqat harf, bo'shliq, apostrof, tire (lotin + kirill)
 *  - 50 belgidan oshmasin
 *  - Faqat raqam yoki maxsus belgi bo'lmasin
 */
const NAME_REGEX = /^[a-zA-ZА-Яа-яЁёA-Za-zÀ-ÖØ-öø-ÿ''\-\s]{2,50}$/u;

/**
 * Telefon:
 *  - O'zbekiston: +998 XX XXX XX XX
 *  - Qabul qilinadigan formatlar:
 *      +998901234567
 *      +998 90 123 45 67
 *      998901234567
 *      0901234567
 *      90 123 45 67
 *  - Raqamlar soni (tozalangandan keyin): 9 yoki 12
 */
const PHONE_CLEAN_REGEX = /\D/g;
// Prefiks har doim o'zgarmas
const PHONE_PREFIX = "+998 ";
// To'liq format: +998 XX XXX XX XX = 19 belgi
const PHONE_MAX_LENGTH = 19;

/** +998 dan keyingi 9 raqamni XX XXX XX XX formatida chiqarish */
function formatLocalDigits(digits: string): string {
    const d = digits.slice(0, 9);
    const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)];
    return parts.filter(Boolean).join(" ");
}

/** Value dan mahalliy 9 raqamni ajratib olish */
function extractLocalDigits(value: string): string {
    const withoutPrefix = value.startsWith(PHONE_PREFIX)
        ? value.slice(PHONE_PREFIX.length)
        : value;
    return withoutPrefix.replace(PHONE_CLEAN_REGEX, "").slice(0, 9);
}

/** Har qanday inputni +998 XX XXX XX XX formatiga keltirish */
function sanitizePhone(value: string): string {
    if (!value.startsWith(PHONE_PREFIX)) {
        const digits = value.replace(PHONE_CLEAN_REGEX, "");
        const local = digits.startsWith("998") ? digits.slice(3) : digits;
        return PHONE_PREFIX + formatLocalDigits(local);
    }
    return PHONE_PREFIX + formatLocalDigits(extractLocalDigits(value));
}

function validatePhone(raw: string): string | null {
    const local = extractLocalDigits(raw);
    if (local.length === 0) return "Telefon raqam kiritilmadi.";
    if (local.length < 9)   return "Yana " + (9 - local.length) + " ta raqam kiriting.";
    const validPrefixes = ["90","91","93","94","95","97","98","99","20","33","50","55","77","88"];
    if (!validPrefixes.includes(local.slice(0, 2))) {
        return "Noto'g'ri operator kodi. Masalan: 90, 91, 93, 95, 97, 99...";
    }
    return null;
}

/** Ism — faqat harf, bo'shliq, apostrof, tire */
function sanitizeName(value: string): string {
    return value.replace(/[^a-zA-ZА-Яа-яЁёA-Za-zÀ-ÖØ-öø-ÿ''\-\s]/gu, "").slice(0, 50);
}

/** Manzil — 5–200 belgi */
function validateAddress(value: string): string | null {
    const v = value.trim();
    if (v.length === 0)   return "Manzil kiritilmadi.";
    if (v.length < 5)     return "Manzil juda qisqa (kamida 5 belgi).";
    if (v.length > 200)   return "Manzil juda uzun (200 belgigacha).";
    return null;
}

/** Miqdor — 1 dan 999 gacha butun son */
function validateQuantity(value: string): string | null {
    const n = parseInt(value, 10);
    if (isNaN(n) || value.trim() === "") return "Miqdor kiritilmadi.";
    if (n < 1)    return "Miqdor 1 dan kam bo'lmasin.";
    if (n > 999)  return "Miqdor 999 dan oshmasin.";
    if (!Number.isInteger(n)) return "Miqdor butun son bo'lishi kerak.";
    return null;
}

/** Izoh — ixtiyoriy, lekin 500 belgidan oshmasin */
function validateComment(value: string): string | null {
    if (value.length > 500) return "Izoh 500 belgidan oshmasin.";
    return null;
}

// ─── Field errors type ──────────────────────────────────────────────────────
interface FieldErrors {
    name: string;
    phone: string;
    quantity: string;
    address: string;
    comment: string;
}

const EMPTY_ERRORS: FieldErrors = {
    name: "", phone: "", quantity: "", address: "", comment: "",
};

// ─── Component ──────────────────────────────────────────────────────────────
export default function OrderModal({ isOpen, onClose, productName }: OrderModalProps) {
    const [form, setForm] = useState({
        name: "", phone: "", quantity: "1", address: "", comment: "",
    });
    const [errors, setErrors] = useState<FieldErrors>(EMPTY_ERRORS);
    // track which fields user has "touched" (blurred or submitted once)
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [apiError, setApiError] = useState("");

    // ── Validate a single field ──────────────────────────────────────────────
    const validateField = useCallback((field: string, value: string): string => {
        switch (field) {
            case "name": {
                const v = value.trim();
                if (!v)               return "Ism kiritilmadi.";
                if (v.length < 2)     return "Ism kamida 2 ta harfdan iborat bo'lishi kerak.";
                if (!NAME_REGEX.test(v)) return "Ismda faqat harf, tire va apostrof bo'lishi mumkin.";
                return "";
            }
            case "phone":
                return validatePhone(value) ?? "";
            case "quantity":
                return validateQuantity(value) ?? "";
            case "address":
                return validateAddress(value) ?? "";
            case "comment":
                return validateComment(value) ?? "";
            default:
                return "";
        }
    }, []);

    // ── Handle input change ──────────────────────────────────────────────────
    const handleChange = (field: string, raw: string) => {
        let value = raw;
        if (field === "phone") value = sanitizePhone(raw);
        if (field === "name")  value = sanitizeName(raw);

        setForm((prev) => ({ ...prev, [field]: value }));

        // Re-validate live only if field was already touched OR submit was attempted
        if (touched[field] || submitAttempted) {
            setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
        }
    };

    // ── Handle blur — mark field as touched ─────────────────────────────────
    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field as keyof typeof form]) }));
    };

    // ── Handle phone formatting on blur ─────────────────────────────────────
    const handlePhoneBlur = () => {
        handleBlur("phone");
        // Auto-format: if user typed 9 digits, prepend +998
        const digits = form.phone.replace(PHONE_CLEAN_REGEX, "");
        if (digits.length === 9 && !form.phone.startsWith("+")) {
            const formatted = `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
            setForm((prev) => ({ ...prev, phone: formatted }));
        }
    };

    // ── Validate all fields ──────────────────────────────────────────────────
    const validateAll = (): boolean => {
        const newErrors: FieldErrors = {
            name:     validateField("name",     form.name),
            phone:    validateField("phone",    form.phone),
            quantity: validateField("quantity", form.quantity),
            address:  validateField("address",  form.address),
            comment:  validateField("comment",  form.comment),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => e === "");
    };

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);
        // Mark all fields touched so errors show
        setTouched({ name: true, phone: true, quantity: true, address: true, comment: true });

        if (!validateAll()) return;

        setApiError("");
        setStatus("loading");

        // Clean phone for Telegram message
        const cleanPhone = form.phone.replace(PHONE_CLEAN_REGEX, "");
        const displayPhone = `+998 ${cleanPhone.slice(-9, -7)} ${cleanPhone.slice(-7, -4)} ${cleanPhone.slice(-4, -2)} ${cleanPhone.slice(-2)}`;

        const text = [
            `🛒 <b>Yangi buyurtma</b>`,
            productName ? `📦 <b>Mahsulot:</b> ${productName}` : "",
            `👤 <b>Ism:</b> ${form.name.trim()}`,
            `📞 <b>Tel:</b> ${displayPhone}`,
            `🔢 <b>Miqdori:</b> ${form.quantity}`,
            `📍 <b>Manzil:</b> ${form.address.trim()}`,
            form.comment.trim() ? `💬 <b>Izoh:</b> ${form.comment.trim()}` : "",
        ].filter(Boolean).join("\n");

        try {
            const botToken = "8795322910:AAGAQgw8xT8DG6iKYBCBFVudiUspfbPbPjA";
            const chatId   = "-1003715399184";

            if (!botToken || !chatId) throw new Error("Telegram config missing");

            const res = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
                }
            );

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.description ?? "Telegram API error");
            }

            setStatus("success");
        } catch (err) {
            setStatus("error");
            setApiError(
                err instanceof Error && err.message !== "Telegram config missing"
                    ? "Server bilan bog'lanishda xatolik. Iltimos, qayta urinib ko'ring."
                    : "Konfiguratsiya xatosi. Administrator bilan bog'laning."
            );
        }
    };

    // ── Close & reset ────────────────────────────────────────────────────────
    const handleClose = () => {
        if (status === "loading") return;
        onClose();
        setTimeout(() => {
            setForm({ name: "", phone: "", quantity: "1", address: "", comment: "" });
            setErrors(EMPTY_ERRORS);
            setTouched({});
            setSubmitAttempted(false);
            setStatus("idle");
            setApiError("");
        }, 300);
    };

    // ── Field config ─────────────────────────────────────────────────────────
    const fields = [
        {
            id: "name",
            label: "Ismingiz",
            placeholder: "Masalan: Sardor Karimov",
            type: "text",
            required: true,
            autoComplete: "name",
            inputMode: undefined as React.HTMLAttributes<HTMLInputElement>["inputMode"],
            hint: "Kamida 2 ta harf, faqat harflar",
        },
        {
            id: "phone",
            label: "Telefon",
            placeholder: "+998 90 123 45 67",
            type: "tel",
            required: true,
            autoComplete: "tel",
            inputMode: "tel" as React.HTMLAttributes<HTMLInputElement>["inputMode"],
            hint: "Operator kodi va 7 ta raqam kiriting",
        },
        {
            id: "quantity",
            label: "Miqdor",
            placeholder: "1",
            type: "number",
            required: false,
            autoComplete: "off",
            inputMode: "numeric" as React.HTMLAttributes<HTMLInputElement>["inputMode"],
            hint: "1 dan 999 gacha",
        },
        {
            id: "address",
            label: "Manzil",
            placeholder: "Masalan: Toshkent, Chilonzor t., 12-uy",
            type: "text",
            required: true,
            autoComplete: "street-address",
            inputMode: undefined as React.HTMLAttributes<HTMLInputElement>["inputMode"],
            hint: "Kamida 5 ta belgi",
        },
    ] as const;

    const hasAnyError = Object.values(errors).some((e) => e !== "");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.93, y: 24 }}
                        animate={{ opacity: 1, scale: 1,    y: 0  }}
                        exit={{   opacity: 0, scale: 0.93, y: 24  }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="pointer-events-auto w-full max-w-md bg-gradient-card border border-gold rounded-2xl shadow-gold overflow-hidden max-h-[90vh] flex flex-col">

                            {/* Header */}
                            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border flex-shrink-0">
                                <div>
                                    <h2 className="font-display font-bold text-xl text-foreground">
                                        Buyurtma berish
                                    </h2>
                                    {productName && (
                                        <p className="text-primary text-sm font-body mt-0.5 truncate max-w-xs">
                                            {productName}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={handleClose}
                                    disabled={status === "loading"}
                                    aria-label="Yopish"
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-40 flex-shrink-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Body — scrollable */}
                            <div className="px-6 py-5 overflow-y-auto flex-1">
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center gap-4 py-8 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                            <CheckCircle2 className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="font-display font-bold text-xl text-foreground">
                                            Buyurtma qabul qilindi!
                                        </h3>
                                        <p className="text-muted-foreground font-body text-sm">
                                            Tez orada siz bilan bog&apos;lanamiz.
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-gold font-body font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
                                        >
                                            Yopish
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                                        {fields.map((field) => {
                                            const err = errors[field.id];
                                            const isDirty = touched[field.id] || submitAttempted;
                                            const isError = isDirty && !!err;
                                            const isOk    = isDirty && !err && form[field.id].trim() !== "" && field.id !== "quantity";

                                            return (
                                                <div key={field.id} className="space-y-1">
                                                    <Label
                                                        htmlFor={`modal-${field.id}`}
                                                        className="text-foreground font-body text-sm flex items-center gap-1"
                                                    >
                                                        {field.label}
                                                        {field.required && (
                                                            <span className="text-destructive" aria-hidden="true">*</span>
                                                        )}
                                                    </Label>

                                                    <div className="relative">
                                                        <Input
                                                            id={`modal-${field.id}`}
                                                            type={field.type}
                                                            inputMode={field.inputMode}
                                                            placeholder={field.placeholder}
                                                            value={form[field.id]}
                                                            autoComplete={field.autoComplete}
                                                            onChange={(e) => {
                                                                // Protect +998 prefix — user cannot delete it
                                                                if (field.id === "phone" && !e.target.value.startsWith(PHONE_PREFIX)) {
                                                                    handleChange("phone", sanitizePhone(e.target.value));
                                                                    return;
                                                                }
                                                                handleChange(field.id, e.target.value);
                                                            }}
                                                            onBlur={field.id === "phone" ? handlePhoneBlur : () => handleBlur(field.id)}
                                                            onKeyDown={(e) => {
                                                                // Prevent deleting into the prefix
                                                                if (field.id === "phone") {
                                                                    const el = e.currentTarget;
                                                                    const selStart = el.selectionStart ?? 0;
                                                                    const prefixLen = PHONE_PREFIX.length;
                                                                    if (
                                                                        (e.key === "Backspace" && selStart <= prefixLen) ||
                                                                        (e.key === "Delete"    && selStart < prefixLen)
                                                                    ) {
                                                                        e.preventDefault();
                                                                    }
                                                                }
                                                            }}
                                                            onClick={(e) => {
                                                                // Move cursor after prefix if clicked before it
                                                                if (field.id === "phone") {
                                                                    const el = e.currentTarget;
                                                                    const prefixLen = PHONE_PREFIX.length;
                                                                    if ((el.selectionStart ?? 0) < prefixLen) {
                                                                        el.setSelectionRange(prefixLen, prefixLen);
                                                                    }
                                                                }
                                                            }}
                                                            min={field.type === "number" ? 1 : undefined}
                                                            max={field.type === "number" ? 999 : undefined}
                                                            maxLength={
                                                                field.id === "phone"   ? PHONE_MAX_LENGTH :
                                                                    field.id === "name"    ? 50 :
                                                                        field.id === "address" ? 200 : undefined
                                                            }
                                                            disabled={status === "loading"}
                                                            aria-invalid={isError}
                                                            aria-describedby={isError ? `err-${field.id}` : `hint-${field.id}`}
                                                            className={[
                                                                "bg-background/50 text-foreground h-11 pr-9 transition-colors",
                                                                isError ? "border-destructive focus-visible:ring-destructive/50" : "",
                                                                isOk    ? "border-primary/60" : "border-border",
                                                            ].join(" ")}
                                                        />
                                                        {/* Status icon */}
                                                        {isDirty && form[field.id] !== "" && (
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                {isError
                                    ? <AlertCircle className="w-4 h-4 text-destructive" aria-hidden="true" />
                                    : isOk
                                        ? <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                                        : null
                                }
                              </span>
                                                        )}
                                                    </div>

                                                    {/* Error message */}
                                                    <AnimatePresence mode="wait">
                                                        {isError ? (
                                                            <motion.p
                                                                key="error"
                                                                id={`err-${field.id}`}
                                                                role="alert"
                                                                initial={{ opacity: 0, y: -4, height: 0 }}
                                                                animate={{ opacity: 1, y: 0,  height: "auto" }}
                                                                exit={{   opacity: 0, y: -4, height: 0 }}
                                                                transition={{ duration: 0.18 }}
                                                                className="text-destructive text-xs font-body flex items-center gap-1 overflow-hidden"
                                                            >
                                                                <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                                                                {err}
                                                            </motion.p>
                                                        ) : (
                                                            <p
                                                                key="hint"
                                                                id={`hint-${field.id}`}
                                                                className="text-muted-foreground text-xs font-body"
                                                            >
                                                                {field.hint}
                                                            </p>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}

                                        {/* Comment */}
                                        <div className="space-y-1">
                                            <Label htmlFor="modal-comment" className="text-foreground font-body text-sm">
                                                Izoh
                                            </Label>
                                            <Textarea
                                                id="modal-comment"
                                                placeholder="Qo'shimcha izoh yoki so'rovlar..."
                                                value={form.comment}
                                                onChange={(e) => handleChange("comment", e.target.value)}
                                                onBlur={() => handleBlur("comment")}
                                                maxLength={500}
                                                rows={3}
                                                disabled={status === "loading"}
                                                aria-invalid={!!(touched.comment && errors.comment)}
                                                className={[
                                                    "bg-background/50 text-foreground resize-none transition-colors",
                                                    touched.comment && errors.comment ? "border-destructive" : "border-border",
                                                ].join(" ")}
                                            />
                                            <div className="flex items-center justify-between">
                                                {touched.comment && errors.comment ? (
                                                    <p className="text-destructive text-xs font-body" role="alert">
                                                        {errors.comment}
                                                    </p>
                                                ) : (
                                                    <span />
                                                )}
                                                <p className={`text-xs font-body ml-auto ${form.comment.length > 450 ? "text-destructive" : "text-muted-foreground"}`}>
                                                    {form.comment.length}/500
                                                </p>
                                            </div>
                                        </div>

                                        {/* API error */}
                                        {(status === "error" && apiError) && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30"
                                                role="alert"
                                            >
                                                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                                                <p className="text-destructive text-sm font-body">{apiError}</p>
                                            </motion.div>
                                        )}

                                        {/* Submit — disabled if visible errors exist after first attempt */}
                                        <button
                                            type="submit"
                                            disabled={status === "loading" || (submitAttempted && hasAnyError)}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold px-6 py-3.5 rounded-xl font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 text-sm cursor-pointer"
                                        >
                                            {status === "loading" ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                                    Yuborilmoqda...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" aria-hidden="true" />
                                                    Yuborish
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}