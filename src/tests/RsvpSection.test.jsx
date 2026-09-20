import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RsvpSection } from "../sections/RsvpSection";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("RsvpSection", () => {
  it("mostra erros de validação ao enviar vazio", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<RsvpSection />);

    await user.click(screen.getByRole("button", { name: /enviar confirma/i }));

    expect(await screen.findByText(/informe seu nome completo/i)).toBeInTheDocument();
    expect(await screen.findByText(/selecione uma op/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("exibe confirmação de sucesso com dados válidos", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, message: "ok" }),
      }),
    );
    const user = userEvent.setup();
    render(<RsvpSection />);

    await user.type(screen.getByLabelText(/nome completo/i), "Maria Silva");
    await user.click(screen.getByLabelText(/sim, estarei presente/i));
    await user.click(screen.getByRole("button", { name: /enviar confirma/i }));

    expect(
      await screen.findByText(/obrigado/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });

  it("mostra mensagem de erro quando o envio falha", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, message: "erro da api" }),
      }),
    );
    const user = userEvent.setup();
    render(<RsvpSection />);

    await user.type(screen.getByLabelText(/nome completo/i), "Maria Silva");
    await user.click(screen.getByLabelText(/não poderei comparecer/i));
    await user.click(screen.getByRole("button", { name: /enviar confirma/i }));

    expect(
      await screen.findByText(/não foi possível enviar sua confirmação/i),
    ).toBeInTheDocument();
  });
});