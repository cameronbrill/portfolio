import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "../app/page";

describe.concurrent("Home component", () => {
  test("should render the correct shortcut based on the OS", () => {
    render(<Home />);

    const shortcut = screen.getByText(/⌘+K|ctrl+K/i); // Matches either "⌘+K" or "ctrl+K"

    expect(shortcut).toBeInTheDocument();
  });
});
