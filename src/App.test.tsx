import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders ", async () => {
    render(<App />);

    // Header - title
    const title = await screen.findByText("Stock Comparison");
    expect(title).toBeDefined();

    // Header - actions - mock btn enabled & toggled with tooltip
    const btnMock = await screen.findByTestId("header-btn-mock");
    expect(btnMock).toBeDefined();
    expect(btnMock).toBeEnabled();
    expect(btnMock).toHaveAttribute("aria-pressed", "true");
    fireEvent.mouseOver(btnMock);
    expect(
      await screen.findByText(
        "When MOCK API mode is enabled, the data results are pulled from a local source."
      )
    );

    // Header - actions - theme btn enabled & NOT toggled with tooltip
    const btnTheme = await screen.findByTestId("header-btn-theme");
    expect(btnTheme).toBeDefined();
    expect(btnTheme).toBeEnabled();
    expect(btnTheme).toHaveAttribute("aria-pressed", "false");
    fireEvent.mouseOver(btnTheme);
    expect(
      await screen.findByText(
        "When DARK mode is enabled, the UI colors of view components are adjusted."
      )
    );

    // Dashboard - info banner
    const banner = await screen.findByTestId("dashboard-info-banner");
    expect(banner).toBeDefined();

    // TODO check autocomplete, and stock overview
  });
});
