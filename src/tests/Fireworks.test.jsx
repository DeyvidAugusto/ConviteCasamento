import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fireworks } from "../components/Fireworks";

const { createMock } = vi.hoisted(() => ({ createMock: vi.fn(() => vi.fn()) }));

vi.mock("canvas-confetti", () => ({
  default: { create: createMock },
}));

describe("Fireworks", () => {
  beforeEach(() => {
    createMock.mockClear();
  });

  it("não renderiza nada quando inativo", () => {
    render(<Fireworks active={false} />);

    expect(screen.queryByTestId("fireworks")).not.toBeInTheDocument();
    expect(createMock).not.toHaveBeenCalled();
  });

  it("renderiza o canvas e inicia a sequência quando ativo", () => {
    render(<Fireworks active />);

    expect(screen.getByTestId("fireworks")).toBeInTheDocument();
    expect(createMock).toHaveBeenCalledTimes(1);
  });
});
