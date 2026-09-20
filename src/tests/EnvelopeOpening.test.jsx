import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnvelopeOpening } from "../components/EnvelopeOpening";

describe("EnvelopeOpening", () => {
  it("eleva a carta acima do envelope quando aberto", async () => {
    const user = userEvent.setup();
    render(<EnvelopeOpening onOpen={() => {}} onFinish={() => {}} />);

    const letter = screen.getByTestId("envelope-letter");
    expect(letter.style.zIndex).toBe("20");

    await user.click(screen.getByRole("button", { name: /^abrir convite$/i }));

    expect(letter.style.zIndex).toBe("50");
  });

  it("notifica o pai ao abrir o convite", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<EnvelopeOpening onOpen={onOpen} onFinish={() => {}} />);

    await user.click(screen.getByRole("button", { name: /^abrir convite$/i }));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});