import { useEffect, useState } from "react";
import { getTimeRemaining } from "../lib/countdown";

export function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(target));

  useEffect(() => {
    setRemaining(getTimeRemaining(target));
    const id = setInterval(() => {
      const next = getTimeRemaining(target);
      setRemaining(next);
      if (next.finished) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  return remaining;
}
