"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/vf-logo.png";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#mahsulot", label: "Mahsulot" },
  { href: "#haqida", label: "Kompaniya" },
  { href: "#aloqa", label: "Aloqa" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logoImage} alt="Vitaflow Pharm logo" className="h-10 w-10 object-contain" />
          <span className="font-display font-bold text-lg text-gradient-gold">Vitaflow Pharm</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors font-body text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#aloqa"
            className="bg-gradient-gold px-5 py-2 rounded-lg font-body font-semibold text-sm text-primary-foreground"
          >
            Bog`lanish
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menyu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-muted-foreground hover:text-primary transition-colors font-body"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
