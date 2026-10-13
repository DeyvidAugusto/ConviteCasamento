import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RsvpSection } from "../sections/RsvpSection";

describe("RsvpSection", () => {
  it("exibe a mensagem de prazo encerrado", () => {
    render(<RsvpSection />);

    expect(
      screen.getByText(/a data para a confirmação de presença já passou/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/entre em contato com os noivos/i),
    ).toBeInTheDocument();
  });

  it("não renderiza o formulário de confirmação", () => {
    render(<RsvpSection />);

    expect(
      screen.queryByRole("button", { name: /enviar confirma/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/nome completo/i)).not.toBeInTheDocument();
  });

  it("mantém o identificador da seção para navegação", () => {
    render(<RsvpSection />);

    expect(document.getElementById("rsvp")).toBeInTheDocument();
  });
});