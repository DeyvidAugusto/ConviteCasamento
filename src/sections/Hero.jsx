import { motion } from "motion/react";
import { OrnamentDivider } from "../components/OrnamentDivider";
import { weddingConfig } from "../config/wedding.config";

const { couple, date, hero } = weddingConfig;

const EASE = [0.22, 1, 0.36, 1];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(163,184,153,0.16), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <motion.p
        className="mb-6 font-sans text-xs tracking-[0.5em] text-gold-deep uppercase"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      >
        {hero.eyebrow}
      </motion.p>

      <motion.h1
        className="font-serif text-[2.5rem] leading-tight text-charcoal sm:text-7xl lg:text-8xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: EASE }}
      >
        {couple.groom}
        <span className="mx-3 text-gold sm:mx-5">&amp;</span>
        {couple.bride}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
      >
        <OrnamentDivider className="my-8" />
      </motion.div>

      <motion.p
        className="max-w-xl font-serif text-lg italic text-charcoal-soft sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
      >
        {hero.verse}
      </motion.p>

      <motion.p
        className="mt-10 font-sans text-sm tracking-[0.35em] text-gold-deep uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1, ease: EASE }}
      >
        {date.display}
      </motion.p>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2 text-charcoal-soft/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
      >
        <span className="text-[0.65rem] tracking-[0.4em] uppercase">{hero.scrollLabel}</span>
        <motion.span
          className="block h-10 w-px bg-gold/60"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
