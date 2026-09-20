const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getTimeRemaining(target, now = new Date()) {
  const targetTime = target instanceof Date ? target.getTime() : new Date(target).getTime();
  const nowTime = now instanceof Date ? now.getTime() : new Date(now).getTime();
  const diff = targetTime - nowTime;

  if (!Number.isFinite(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
    finished: false,
  };
}
