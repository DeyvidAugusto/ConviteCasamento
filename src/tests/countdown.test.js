import { describe, it, expect } from "vitest";
import { getTimeRemaining } from "../lib/countdown";

describe("getTimeRemaining", () => {
  it("calcula dias, horas, minutos e segundos restantes", () => {
    const now = new Date("2026-12-01T12:00:00");
    const target = new Date("2026-12-12T16:00:00");

    const result = getTimeRemaining(target, now);

    expect(result).toEqual({
      days: 11,
      hours: 4,
      minutes: 0,
      seconds: 0,
      finished: false,
    });
  });

  it("retorna zeros e finished quando a data já passou", () => {
    const now = new Date("2026-12-13T00:00:00");
    const target = new Date("2026-12-12T16:00:00");

    const result = getTimeRemaining(target, now);

    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      finished: true,
    });
  });

  it("retorna finished no exato momento do casamento", () => {
    const now = new Date("2026-12-12T16:00:00");
    const target = new Date("2026-12-12T16:00:00");

    expect(getTimeRemaining(target, now).finished).toBe(true);
  });

  it("quebra o tempo restante corretamente", () => {
    const now = new Date("2026-12-12T15:58:30");
    const target = new Date("2026-12-12T16:00:00");

    const result = getTimeRemaining(target, now);

    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 30,
      finished: false,
    });
  });
});
