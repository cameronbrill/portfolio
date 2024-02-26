import { expect, test, describe, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "../app/page";

describe("Home page K-Bar command suggestion", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test.each([
    ["Macintosh", "⌘+K"],
    ["Other", "ctrl+K"],
  ])("on %s OS is: %s", (os, expected) => {
    const userAgentGetter = vi.spyOn(window.navigator, "userAgent", "get");
    userAgentGetter.mockReturnValue(os);

    render(<Home />);

    const shortcut = screen.getByRole("heading", { name: expected });

    expect(shortcut).toBeInTheDocument();
  });
});
