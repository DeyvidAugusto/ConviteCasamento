import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfoSection } from "../sections/InfoSection";

describe("InfoSection", () => {
  it("exibe o título e os itens de informações importantes", () => {
    render(<InfoSection />);

    expect(screen.getByText(/informações importantes/i)).toBeInTheDocument();
    expect(screen.getByText(/cada convidado leva a sua própria bebida/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^estacionamento$/i })).toBeInTheDocument();
    expect(screen.getByText(/confirme sua presença até/i)).toBeInTheDocument();
  });
});
