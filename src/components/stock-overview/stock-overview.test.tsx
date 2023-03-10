import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { StockRow } from "./stock-row";
import { StockOverview } from "./stock-overview";
import { StockType } from "../stocks";

const stock: StockType = {
  name: "some name",
  symbol: "some symbol",
  overview: {
    country: "country",
    eps: "-0.234",
    currency: "USD",
    description: "description",
    exchange: "exchange",
  },
  quote: {
    change: "-0.8900",
    low: "low",
    high: "high",
    change_percent: "-9.6529%",
    price: "price",
  },
};

describe("StockOverview", () => {
  it("renders header and body", async () => {
    render(
      <StockOverview
        stock={stock}
        isMockMode
        selectedStocks={[]}
        setSelectedStocks={() => jest.fn()}
      />
    );

    // header - title
    const symbol = await screen.findByTestId("stock-header-symbol");
    expect(symbol).toBeDefined();
    expect(symbol).toHaveTextContent("some symbol");

    // header - icon with tooltip
    const icon = await screen.findByTestId("stock-header-icon");
    expect(icon).toBeDefined();

    fireEvent.mouseOver(icon);
    expect(await screen.findByText("description")).toBeInTheDocument();

    // body - rows
    const labels = await screen.findAllByTestId("stock-row-label");
    expect(labels).toHaveLength(7);

    const values = await screen.findAllByTestId("stock-row-value");
    expect(values).toHaveLength(7);

    // body - currency formatting
    const eps = await screen.findByText("- $ 0.23 USD");
    expect(eps).toBeInTheDocument();

    // body - arrow indicator
    const arrow = await screen.findByTestId("change-arrow-down");
    expect(arrow).toBeInTheDocument();
  });
});
