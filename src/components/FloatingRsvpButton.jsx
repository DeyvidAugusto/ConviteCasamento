import { motion } from "motion/react";
import { weddingConfig } from "../config/wedding.config";

const { rsvp } = weddingConfig;

export function FloatingRsvpButton() {
  return (
    <motion.a
      href="#rsvp"
      aria-label={`Ir para o formulário: ${rsvp.title}`}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-gold px-5 py-4 font-sans text-xs tracking-[0.2em] text-ivory uppercase shadow-[0_16px_34px_-14px_rgba(156,124,23,0.9)] transition-colors hover:bg-gold-deep"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <span>{rsvp.floatingLabel}</span>
    </motion.a>
  );
}
