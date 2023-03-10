import React from "react";
import { render, screen } from "@testing-library/react";
import { TechItem } from "./tech-item";

describe("TechItem", () => {
  it("renders link", async () => {
    render(
      <TechItem
        href="www.google.com"
        name="some link"
        src="some source"
        alt="some alt label"
      />
    );

    const link = await screen.findByTestId("item-link");
    expect(link).toBeDefined();
  });
});
