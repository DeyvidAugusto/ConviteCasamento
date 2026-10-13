import { RevealOnScroll } from "../components/RevealOnScroll";
import { OrnamentDivider } from "../components/OrnamentDivider";
import { weddingConfig } from "../config/wedding.config";

const { rsvp } = weddingConfig;

export function RsvpSection() {
  return (
    <section id="rsvp" className="scroll-mt-4 bg-ivory-deep/60 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll className="text-center">
          <h2 className="font-serif text-4xl text-charcoal sm:text-5xl">{rsvp.title}</h2>
          <OrnamentDivider className="my-6" />
          <p className="font-sans text-sm tracking-[0.2em] text-charcoal-soft uppercase">
            {rsvp.subtitle}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="mt-12 rounded-sm border border-gold/30 bg-ivory px-8 py-10 shadow-[0_30px_60px_-45px_rgba(47,42,38,0.9)]">
            <div
              className="text-center"
              role="status"
              aria-live="polite"
            >
              <p className="mx-auto max-w-md font-sans text-sm text-charcoal-soft">
                A data para a confirmação de presença já passou. Caso queira
                confirmar sua presença, entre em contato com os noivos.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}