import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { EnvelopeOpening } from "./components/EnvelopeOpening";
import { Fireworks } from "./components/Fireworks";
import { FloatingRsvpButton } from "./components/FloatingRsvpButton";
import { Hero } from "./sections/Hero";
import { Countdown } from "./sections/Countdown";
import { Details } from "./sections/Details";
import { InfoSection } from "./sections/InfoSection";
import { MapSection } from "./sections/MapSection";
import { RsvpSection } from "./sections/RsvpSection";
import { Footer } from "./sections/Footer";

export default function App() {
  const [introOpen, setIntroOpen] = useState(true);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introOpen]);

  const handleOpen = () => setCelebrate(true);
  const handleFinish = () => setIntroOpen(false);

  return (
    <>
      <AnimatePresence>
        {introOpen && <EnvelopeOpening onOpen={handleOpen} onFinish={handleFinish} />}
      </AnimatePresence>

      <Fireworks
        active={celebrate}
        onDone={() => setCelebrate(false)}
        className="fixed inset-0 z-[70] pointer-events-none"
      />

      {!introOpen && <FloatingRsvpButton />}

      <main>
        <Hero />
        <Countdown />
        <Details />
        <InfoSection />
        <MapSection />
        <RsvpSection />
      </main>
      <Footer />
    </>
  );
}
