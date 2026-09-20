import { RevealOnScroll } from "../components/RevealOnScroll";
import { OrnamentDivider } from "../components/OrnamentDivider";
import { weddingConfig } from "../config/wedding.config";

const { ceremony, reception } = weddingConfig;

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function EventCard({ event }) {
  const rows = [
    { icon: <CalendarIcon />, value: event.dateLabel },
    { icon: <ClockIcon />, value: event.timeLabel },
    {
      icon: <PinIcon />,
      value: (
        <>
          <span className="block text-charcoal">{event.venue}</span>
          <span className="block text-sm text-charcoal-soft">{event.address}</span>
        </>
      ),
    },
  ];

  return (
    <div className="flex h-full flex-col rounded-sm border border-gold/30 bg-ivory px-8 py-10 text-left shadow-[0_24px_50px_-40px_rgba(47,42,38,0.9)]">
      <h3 className="text-center font-serif text-3xl text-charcoal">{event.title}</h3>
      <OrnamentDivider className="my-6" />
      <ul className="flex flex-col gap-5">
        {rows.map((row, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="mt-0.5 shrink-0">{row.icon}</span>
            <span className="font-sans text-sm tracking-wide text-charcoal">{row.value}</span>
          </li>
        ))}
      </ul>
      {event.mapUrl && (
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full border border-gold px-8 py-3 font-sans text-xs tracking-[0.3em] text-gold uppercase transition-colors hover:bg-gold hover:text-ivory"
        >
          Ver no Google Maps
        </a>
      )}
    </div>
  );
}

export function Details() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <p className="font-sans text-xs tracking-[0.5em] text-gold-deep uppercase">
            Data, hora e local
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <RevealOnScroll delay={0.05}>
            <EventCard event={ceremony} />
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <EventCard event={reception} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
