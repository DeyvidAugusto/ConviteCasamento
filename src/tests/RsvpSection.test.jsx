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
    expect(
      screen.queryByRole("button", { name: /enviar outra resposta/i }),
    ).not.toBeInTheDocument();
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

  it("exibe o campo de quantidade apenas quando confirma presença", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<RsvpSection />);

    expect(
      screen.queryByLabelText(/quantidade de acompanhantes/i),
    ).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/sim, estarei presente/i));

    expect(
      screen.getByLabelText(/quantidade de acompanhantes/i),
    ).toBeInTheDocument();
  });

  it("mostra campos de acompanhantes conforme a quantidade escolhida", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<RsvpSection />);

    await user.click(screen.getByLabelText(/sim, estarei presente/i));
    const countInput = screen.getByLabelText(/quantidade de acompanhantes/i);
    await user.clear(countInput);
    await user.type(countInput, "2");

    expect(screen.getAllByLabelText(/nome do acompanhante/i)).toHaveLength(2);
  });

  it("mostra erro para acompanhante sem nome", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<RsvpSection />);

    await user.click(screen.getByLabelText(/sim, estarei presente/i));
    const countInput = screen.getByLabelText(/quantidade de acompanhantes/i);
    await user.clear(countInput);
    await user.type(countInput, "1");
    await user.click(screen.getByRole("button", { name: /enviar confirma/i }));

    expect(
      await screen.findByText(/informe o nome do acompanhante/i),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envia confirmação com acompanhantes válidos", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "ok" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<RsvpSection />);

    await user.type(screen.getByLabelText(/nome completo/i), "Maria Silva");
    await user.click(screen.getByLabelText(/sim, estarei presente/i));
    const countInput = screen.getByLabelText(/quantidade de acompanhantes/i);
    await user.clear(countInput);
    await user.type(countInput, "1");
    await user.type(screen.getByLabelText(/nome do acompanhante/i), "João");
    await user.click(screen.getByLabelText(/adulto/i));
    await user.click(screen.getByRole("button", { name: /enviar confirma/i }));

    expect(
      await screen.findByText(/obrigado/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});