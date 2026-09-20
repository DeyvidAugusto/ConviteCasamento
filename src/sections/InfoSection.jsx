import { RevealOnScroll } from "../components/RevealOnScroll";
import { OrnamentDivider } from "../components/OrnamentDivider";
import { weddingConfig } from "../config/wedding.config";

const { info } = weddingConfig;

function DrinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <path d="M6 4h12l-1.2 7.2a5 5 0 0 1-9.6 0L6 4Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 15v5M8.5 20h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 17V7h3.2a3 3 0 0 1 0 6H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function DeadlineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.4" />
      <path d="m9.5 14.5 2 2 3-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  drink: <DrinkIcon />,
  parking: <ParkingIcon />,
  deadline: <DeadlineIcon />,
};

export function InfoSection() {
  return (
    <section className="bg-ivory-deep/60 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <h2 className="font-serif text-4xl text-charcoal sm:text-5xl">{info.title}</h2>
          <OrnamentDivider className="my-6" />
          <p className="font-sans text-sm tracking-[0.2em] text-charcoal-soft uppercase">
            {info.subtitle}
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {info.items.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 0.1}>
              <div className="flex h-full flex-col items-center gap-4 rounded-sm border border-gold/30 bg-ivory px-8 py-10 text-center shadow-[0_24px_50px_-40px_rgba(47,42,38,0.9)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                  {ICONS[item.icon]}
                </span>
                <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                <p className="font-sans text-sm text-charcoal-soft">{item.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
