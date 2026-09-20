import { describe, it, expect, vi, afterEach } from "vitest";
import { validateRsvp, submitRsvp } from "../lib/rsvp";

const ENDPOINT = "https://api.web3forms.com/submit";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("validateRsvp", () => {
  it("aceita dados válidos de presença confirmada", () => {
    const result = validateRsvp({ name: "Maria Silva", attendance: "yes" });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("aceita ausência confirmada", () => {
    const result = validateRsvp({ name: "Maria Silva", attendance: "no" });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejeita nome vazio", () => {
    const result = validateRsvp({ name: "   ", attendance: "yes" });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejeita nome com menos de 2 caracteres", () => {
    const result = validateRsvp({ name: "A", attendance: "yes" });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejeita presença não selecionada", () => {
    const result = validateRsvp({ name: "Maria Silva", attendance: "" });

    expect(result.valid).toBe(false);
    expect(result.errors.attendance).toBeDefined();
  });

  it("aceita presença confirmada sem acompanhantes", () => {
    const result = validateRsvp({
      name: "Maria Silva",
      attendance: "yes",
      guestCount: 0,
      guests: [],
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("aceita presença confirmada com acompanhantes válidos", () => {
    const result = validateRsvp({
      name: "Maria Silva",
      attendance: "yes",
      guestCount: 2,
      guests: [
        { name: "João", type: "adult" },
        { name: "Ana", type: "child" },
      ],
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejeita quantidade de acompanhantes acima do limite", () => {
    const result = validateRsvp({
      name: "Maria Silva",
      attendance: "yes",
      guestCount: 21,
      guests: [],
    });

    expect(result.valid).toBe(false);
    expect(result.errors.guestCount).toBeDefined();
  });

  it("rejeita acompanhante sem nome", () => {
    const result = validateRsvp({
      name: "Maria Silva",
      attendance: "yes",
      guestCount: 1,
      guests: [{ name: "", type: "adult" }],
    });

    expect(result.valid).toBe(false);
    expect(result.errors.guests).toBeDefined();
    expect(result.errors.guests[0].name).toBeDefined();
  });

  it("rejeita acompanhante sem tipo", () => {
    const result = validateRsvp({
      name: "Maria Silva",
      attendance: "yes",
      guestCount: 1,
      guests: [{ name: "João", type: "" }],
    });

    expect(result.valid).toBe(false);
    expect(result.errors.guests).toBeDefined();
    expect(result.errors.guests[0].type).toBeDefined();
  });

  it("não valida acompanhantes quando a resposta é não", () => {
    const result = validateRsvp({
      name: "Maria Silva",
      attendance: "no",
      guestCount: 21,
      guests: [{ name: "", type: "" }],
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe("submitRsvp", () => {
  it("envia os dados para o Web3Forms e retorna sucesso", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "ok" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitRsvp(
      { name: "Maria Silva", attendance: "yes", message: "Parabéns!" },
      "chave-teste",
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");
    const body = JSON.parse(options.body);
    expect(body.access_key).toBe("chave-teste");
    expect(body.subject).toBe("RSVP - Maria Silva");
    expect(body.name).toBe("Maria Silva");
    expect(body.attendance).toBe("Sim, estarei presente");
    expect(body.message).toBe("Parabéns!");
    expect(result.success).toBe(true);
  });

  it("formata os acompanhantes no corpo do envio", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "ok" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitRsvp(
      {
        name: "Maria Silva",
        attendance: "yes",
        guests: [
          { name: "João", type: "adult" },
          { name: "Ana", type: "child" },
        ],
      },
      "chave-teste",
    );

    const [, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.acompanhantes).toBe("João — Adulto(a)\nAna — Criança");
    expect(result.success).toBe(true);
  });

  it("envia acompanhantes vazio quando não há convidados", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "ok" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await submitRsvp(
      { name: "Maria Silva", attendance: "yes", guests: [] },
      "chave-teste",
    );

    const [, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.acompanhantes).toBe("—");
  });

  it("não chama a API quando o honeypot está preenchido", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitRsvp(
      { name: "Bot", attendance: "yes", botcheck: "spam" },
      "chave-teste",
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.skipped).toBe(true);
  });

  it("lança erro quando a API responde com falha", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: "erro da api" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      submitRsvp({ name: "Maria Silva", attendance: "no" }, "chave-teste"),
    ).rejects.toThrow("erro da api");
  });
});
