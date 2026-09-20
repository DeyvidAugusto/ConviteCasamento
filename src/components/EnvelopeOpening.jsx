import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { weddingConfig } from "../config/wedding.config";

const { couple, date } = weddingConfig;

const EASE = [0.22, 1, 0.36, 1];

const [, month, day] = date.iso.slice(0, 10).split("-");
const shortDate = `${day} . ${month} . ${date.iso.slice(0, 4)}`;

export function EnvelopeOpening({ onOpen, onFinish }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleOpen = () => {
    if (open) return;
    if (reduceMotion) {
      onFinish();
      return;
    }
    setOpen(true);
    onOpen?.();
    window.setTimeout(() => onFinish(), 2200);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Abertura do convite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(163,184,153,0.14), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <motion.p
        className="mb-8 font-serif text-sm tracking-[0.5em] text-gold-deep uppercase"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        Convite de Casamento
      </motion.p>

      <div
        className="relative w-[min(88vw,380px)]"
        style={{ perspective: "1200px", aspectRatio: "3 / 2" }}
      >
        <motion.div
          data-testid="envelope-letter"
          className="absolute inset-x-4 bottom-4 top-8 flex flex-col items-center justify-start gap-2 rounded-sm border border-gold/40 bg-ivory px-6 pt-7 text-center shadow-[0_18px_40px_-24px_rgba(47,42,38,0.5)]"
          style={{ zIndex: open ? 50 : 20 }}
          initial={false}
          animate={
            open
              ? { y: "-82%", opacity: 1, scale: 1.04 }
              : { y: "12%", opacity: 0, scale: 0.94 }
          }
          transition={{ duration: 0.9, delay: open ? 0.75 : 0, ease: EASE }}
        >
          <span className="font-serif text-3xl text-gold">{couple.initials}</span>
          <span className="font-serif text-xl text-charcoal sm:text-2xl">
            {couple.groom} &amp; {couple.bride}
          </span>
          <span className="text-xs tracking-[0.35em] text-charcoal-soft uppercase">
            {shortDate}
          </span>
        </motion.div>

        <div className="absolute inset-0 z-10 rounded-sm bg-gradient-to-br from-ivory-deep to-gold-soft shadow-[0_24px_50px_-26px_rgba(47,42,38,0.6)]" />

        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 h-[78%] origin-bottom"
          style={{
            clipPath: "polygon(0 100%, 0 26%, 50% 72%, 100% 26%, 100% 100%)",
            background: "linear-gradient(160deg, #c6d4b8 0%, #a3b899 100%)",
          }}
        />

        <motion.div
          className="absolute inset-x-0 top-0 z-40 h-[62%] origin-top"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background: "linear-gradient(180deg, #b9ccab 0%, #7d9870 100%)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          initial={false}
          animate={{ rotateX: open ? -178 : 0 }}
          transition={{ duration: 1, ease: EASE }}
        />

        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label="Romper o selo e abrir o convite"
          className="absolute left-1/2 top-[52%] z-[60] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-deep/40 bg-gradient-to-br from-gold-soft to-gold-deep font-serif text-lg text-ivory shadow-[0_10px_24px_-10px_rgba(156,124,23,0.9)]"
          initial={false}
          animate={open ? { scale: 0, opacity: 0, rotate: 40 } : { scale: 1, opacity: 1 }}
          whileHover={open ? undefined : { scale: 1.08 }}
          whileTap={open ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {couple.monogram}
        </motion.button>
      </div>

      <motion.button
        type="button"
        onClick={handleOpen}
        className="mt-12 rounded-full border border-gold-deep/40 px-8 py-3 font-serif text-sm tracking-[0.3em] text-gold-deep uppercase transition-colors hover:bg-gold hover:text-ivory"
        initial={false}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        disabled={open}
        style={open ? { pointerEvents: "none" } : undefined}
      >
        Abrir convite
      </motion.button>

      <button
        type="button"
        onClick={() => onFinish()}
        className="absolute bottom-6 right-6 text-xs tracking-[0.25em] text-charcoal-soft/70 uppercase transition-colors hover:text-gold-deep"
      >
        Pular introdução
      </button>
    </motion.div>
  );
}
