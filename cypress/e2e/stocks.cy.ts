describe("e2e", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Loads the default view", () => {
    // Header
    cy.findByText("Stock Comparison").should("be.visible");
    cy.findByTestId("header-btn-mock").should("be.visible");
    cy.findByTestId("header-btn-theme").should("be.visible");
    cy.findByText("Techs:").should("be.visible");

    // Dashboard
    cy.findByText(
      "Search and compare up to 3 companies by symbol or full name."
    ).should("be.visible");
    cy.findByPlaceholderText(
      "Search for your favorite stocks to compare!"
    ).should("be.visible");
  });
});
