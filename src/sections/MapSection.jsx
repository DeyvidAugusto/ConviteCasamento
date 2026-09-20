import { RevealOnScroll } from "../components/RevealOnScroll";
import { OrnamentDivider } from "../components/OrnamentDivider";
import { weddingConfig } from "../config/wedding.config";

const { map, ceremony, reception } = weddingConfig;

function LocationCard({ event }) {
  return (
    <div className="flex h-full flex-col rounded-sm border border-gold/30 bg-ivory/5 px-8 py-10 text-left">
      <p className="font-sans text-xs tracking-[0.35em] text-gold-soft uppercase">{event.title}</p>
      <p className="mt-4 font-serif text-2xl text-ivory">{event.venue}</p>
      <p className="mt-2 font-sans text-sm text-ivory/70">{event.address}</p>
      <a
        href={event.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block self-start rounded-full border border-gold px-8 py-3 font-sans text-xs tracking-[0.3em] text-gold uppercase transition-colors hover:bg-gold hover:text-charcoal"
      >
        {map.buttonLabel}
      </a>
    </div>
  );
}

export function MapSection() {
  return (
    <section className="bg-charcoal px-6 py-24 text-ivory">
      <div className="mx-auto max-w-4xl text-center">
        <RevealOnScroll>
          <h2 className="font-serif text-4xl text-ivory sm:text-5xl">{map.title}</h2>
          <OrnamentDivider className="my-6" />
          <p className="font-sans text-sm tracking-[0.2em] text-ivory/70 uppercase">
            {map.subtitle}
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <RevealOnScroll delay={0.1}>
            <LocationCard event={ceremony} />
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <LocationCard event={reception} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
