import { OrnamentDivider } from "../components/OrnamentDivider";
import { weddingConfig } from "../config/wedding.config";

const { couple, date, footer } = weddingConfig;

export function Footer() {
  return (
    <footer className="bg-charcoal px-6 py-16 text-center text-ivory">
      <OrnamentDivider className="opacity-80" />
      <p className="mt-6 font-serif text-3xl text-ivory">
        {couple.groom} <span className="text-gold">&amp;</span> {couple.bride}
      </p>
      <p className="mt-3 font-sans text-xs tracking-[0.35em] text-ivory/60 uppercase">
        {date.display}
      </p>
      <p className="mx-auto mt-8 max-w-md font-serif text-lg italic text-ivory/80">
        {footer.message}
      </p>
      <p className="mt-10 font-sans text-[0.65rem] tracking-[0.25em] text-ivory/40 uppercase">
        {footer.credit}
      </p>
    </footer>
  );
}
