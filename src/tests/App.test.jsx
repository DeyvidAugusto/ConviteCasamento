import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

vi.mock("canvas-confetti", () => ({
  default: { create: vi.fn(() => vi.fn()) },
}));

describe("App", () => {
  it("renderiza a introdução do envelope e as seções do convite", () => {
    render(<App />);

    expect(screen.getByRole("dialog", { name: /abertura do convite/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^abrir convite$/i })).toBeInTheDocument();
    expect(screen.getAllByText(/silvio/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /confirme sua presença/i })).toBeInTheDocument();
  });

  it("dispara os fogos ao abrir o convite", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByTestId("fireworks")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^abrir convite$/i }));

    expect(await screen.findByTestId("fireworks")).toBeInTheDocument();
  });

  it("mostra o botão flutuante para o formulário após a introdução", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByLabelText(/ir para o formulário/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /pular introdução/i }));

    const floating = await screen.findByLabelText(/ir para o formulário/i);
    expect(floating).toHaveAttribute("href", "#rsvp");
    expect(document.getElementById("rsvp")).toBeInTheDocument();
    expect(screen.queryByTestId("fireworks")).not.toBeInTheDocument();
  });
});