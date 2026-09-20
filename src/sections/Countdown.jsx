import { RevealOnScroll } from "../components/RevealOnScroll";
import { OrnamentDivider } from "../components/OrnamentDivider";
import { useCountdown } from "../hooks/useCountdown";
import { weddingConfig } from "../config/wedding.config";

const { countdown, date } = weddingConfig;

const UNITS = [
  { key: "days", label: countdown.labels.days },
  { key: "hours", label: countdown.labels.hours },
  { key: "minutes", label: countdown.labels.minutes },
  { key: "seconds", label: countdown.labels.seconds },
];

const pad = (value) => String(value).padStart(2, "0");

export function Countdown() {
  const remaining = useCountdown(date.iso);

  return (
    <section className="relative bg-ivory-deep/60 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <RevealOnScroll>
          <h2 className="font-serif text-4xl text-charcoal sm:text-5xl">{countdown.title}</h2>
          <OrnamentDivider className="my-6" />
          <p className="font-sans text-sm tracking-[0.2em] text-charcoal-soft uppercase">
            {countdown.subtitle}
          </p>
        </RevealOnScroll>

        {remaining.finished ? (
          <RevealOnScroll delay={0.1}>
            <p className="mt-14 font-serif text-3xl text-gold-deep sm:text-4xl">
              {countdown.finishedMessage}
            </p>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {UNITS.map(({ key, label }) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-3 rounded-sm border border-gold/30 bg-ivory px-4 py-6 shadow-[0_18px_40px_-30px_rgba(47,42,38,0.6)]"
                >
                  <span className="font-serif text-4xl text-charcoal tabular-nums sm:text-6xl">
                    {pad(remaining[key])}
                  </span>
                  <span className="font-sans text-[0.65rem] tracking-[0.35em] text-gold-deep uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
