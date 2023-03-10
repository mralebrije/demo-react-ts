import React from "react";
import { render, screen } from "@testing-library/react";
import { StockRow } from "./stock-row";

describe("StockRow", () => {
  it("renders with string values", async () => {
    render(<StockRow label="some label" value="some value" />);

    const label = await screen.findByTestId("stock-row-label");
    expect(label).toBeDefined();
    expect(label).toHaveTextContent("some label:");

    const value = await screen.findByTestId("stock-row-value");
    expect(value).toBeDefined();
    expect(value).toHaveTextContent("some value");
  });
  it("renders with custom node values", async () => {
    render(
      <StockRow
        label={<span data-testid="some-custom-label">some custom label</span>}
        value={<span data-testid="some-custom-value">some custom value</span>}
      />
    );

    const label = await screen.findByTestId("some-custom-label");
    expect(label).toBeDefined();
    expect(label).toHaveTextContent("some custom label");

    const value = await screen.findByTestId("some-custom-value");
    expect(value).toBeDefined();
    expect(value).toHaveTextContent("some custom value");
  });
});
