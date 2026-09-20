import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "motion/react";

const COLORS = ["#a3b899", "#c6d4b8", "#6f8a63", "#ffffff"];

const BURST = {
  particleCount: 120,
  spread: 150,
  startVelocity: 52,
  gravity: 0.7,
  decay: 0.93,
  scalar: 1,
  ticks: 700,
};

const ORIGINS = [
  { x: 0.07, y: 0.22 },
  { x: 0.22, y: 0.3 },
  { x: 0.38, y: 0.2 },
  { x: 0.5, y: 0.32 },
  { x: 0.62, y: 0.2 },
  { x: 0.78, y: 0.3 },
  { x: 0.93, y: 0.22 },
];

export function Fireworks({ active, className = "", onDone }) {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!active || reduceMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let cancelled = false;

    const resizeCanvas = () => {
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let instance;
    try {
      instance = confetti.create(canvas, { resize: true });
    } catch {
      window.removeEventListener("resize", resizeCanvas);
      return undefined;
    }

    const done = [];

    for (const origin of ORIGINS) {
      const result = instance({
        ...BURST,
        origin,
        colors: COLORS,
        disableForReducedMotion: true,
      });
      if (result && typeof result.then === "function") {
        done.push(result);
      }
    }

    if (done.length) {
      Promise.all(done).then(() => {
        if (!cancelled) {
          onDoneRef.current?.();
        }
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      instance.reset?.();
    };
  }, [active, reduceMotion]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      data-testid="fireworks"
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 ${className}`}
    />
  );
}